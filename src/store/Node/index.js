import { Model } from '@vuex-orm/core';
import ERPC from '@etclabscore/ethereum-json-rpc';
import {
  addressFromPublicKey,
  hexStringFromBytes,
  bytesFromBase32String,
} from '@catalyst-net-js/common';
import Peer from '../Peer';
import Wallet from '../Wallet';

export default class Node extends Model {
  static entity = 'nodes';

  static primaryKey = 'peerId';

  static fields() {
    return {
      peerId: this.attr(''),
      userId: this.attr(''),
      ipAddress: this.attr('77.68.110.194'),
      status: this.attr(''),
      version: this.attr(''),
      reputation: this.attr(''),
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
        port: 5005,
        type: 'http',
        path: '/api/eth/request',
      },
    });
  }
}
