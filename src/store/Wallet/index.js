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

  get provider() {
    const { node } = this;
    return new Web3(`http://${node.ipAddress}:${node.port}/api/eth/request`);
  }

  async getNonce() {
    const { node } = this;
    const web3 = new Web3(`http://${node.ipAddress}:${node.port}/api/eth/request`);
    return web3.eth.getTransactionCount(this.address);
  }

  async createTx(to, value) {
    const { numberToHex, toWei, bytesToHex } = Web3.utils;
    const Tx = await loadTxLib();
    const nonce = await this.getNonce();
    const txData = {
      nonce: `0x${parseInt(nonce, 16)}`,
      to,
      value: numberToHex(toWei(value.toString(), 'ether')),
      gasLimit: '0x520C',
      gasPrice: '0x5',
      data: '0x0',
    };

    const transaction = new Tx(txData);
    await transaction.sign(this.privateKey);

    return bytesToHex(transaction.serialize());
  }

  async sendTx(tx) {
    const web3 = this.provider;
    return new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(tx)
        .on('transactionHash', hash => resolve(hash))
        .on('error', console.error)
        .catch(reject);
    });
  }

  static async createWallet(wallet, nodeId, userId) {
    const newWallet = await Wallet.insert({
      data: {
        address: wallet.getAddressString(),
        nodeId,
        userId,
        secret: wallet.getPrivateKeyString(),
      },
    });
    return newWallet;
  }
}
