/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import ERPC from '@etclabscore/ethereum-json-rpc';
import {
  addressFromPublicKey,
  hexStringFromBytes,
  bytesFromBase32String,
} from '@catalyst-net-js/common';
import Peer from '../Peer';
import Wallet from '../Wallet';

const fs = require('fs');
const homedir = require('os').homedir();

export default class Node extends Model {
  static entity = 'nodes';

  static primaryKey = 'peerId';

  static fields() {
    return {
      peerId: this.attr(''),
      publicKey: this.attr(''),
      name: this.attr(''),
      userId: this.attr(''),
      ipAddress: this.attr('77.68.110.194'),
      externalAddress: this.attr('77.68.110.194'),
      port: this.attr(5005),
      status: this.attr(''),
      version: this.attr(''),
      reputation: this.attr(''),
      local: this.boolean(true),
      syncing: this.boolean(false),
      peers: this.hasMany(Peer, 'nodeId'),
      wallet: this.hasOne(Wallet, 'nodeId'),
    };
  }

  get address() {
    const bytes = bytesFromBase32String(this.peerId);
    const addressBytes = addressFromPublicKey(bytes);

    return `0x${hexStringFromBytes(addressBytes)}`;
  }

  get rpc() {
    return new ERPC({
      transport: {
        host: this.ipAddress,
        port: this.port,
        type: 'http',
        path: '/api/eth/request',
      },
    });
  }

  static getLocalKeystore() {
    try {
      const keyPath = `${homedir}/.catalyst/dfs/keys/keystore.txt`;
      return JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  static getConfig() {
    try {
      const filePath = `${homedir}/.catalyst/devnet.json`;
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  static async getWalletFromKeystore(keyFile, password) {
    const Keystore = await this.loadKeystoreLib();
    const wallet = new Keystore(keyFile, password);
    return wallet;
  }

  static async loadKeystoreLib() {
    const keystoreLib = import('@catalyst-net-js/keystore');
    return (await keystoreLib).default;
  }

  static async createNode(node, userId, wallet) {
    const newNode = await Node.insert({
      data: {
        peerId: node.key.Id,
        publickey: wallet.getPublicKeyString(),
        name: node.name,
        userId,
        ipAddress: node.host,
        externalAddress: node.ipAddress,
        port: node.port,
      },
    });
    return newNode;
  }
}
