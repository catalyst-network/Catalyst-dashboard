/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import Web3 from 'web3';
import { bytesFromBase32String } from '@catalyst-net-js/common';
import Node from '../Node';

async function loadTxLib() {
  const Wallet = await import('@catalyst-net-js/tx');
  return Wallet.default;
}

export default class Wallet extends Model {
  static entity = 'wallets';

  static primaryKey = 'address';

  static fields() {
    return {
      balance: this.attr(0),
      nodeId: this.attr(''),
      userId: this.attr(''),
      address: this.attr(''),
      secret: this.attr(''),
    };
  }

  get katBalance() {
    return this.balance / 1000000000000000000;
  }

  get node() {
    return Node.find(this.nodeId);
  }

  get privateKey() {
    return bytesFromBase32String(this.secret);
  }

  async getNonce() {
    const { node } = this;
    const web3 = new Web3(`http://${node.ipAddress}:${node.port}/api/eth/request`);
    return web3.eth.getTransactionCount(this.address);
  }

  async createTx(to, value) {
    const Tx = await loadTxLib();
    const nonce = (await this.getNonce()).toString();
    console.log(nonce);
    const txData = {
      nonce: '0x0',
      to,
      value,
      gasLimit: '0x520C',
      gasPrice: '0x5',
      data: '0x0',
    };

    const transaction = new Tx(txData);
    await transaction.sign(this.privateKey);

    return transaction.serialize();
  }
}
