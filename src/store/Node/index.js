import { Model } from '@vuex-orm/core';
import ERPC from '@etclabscore/ethereum-json-rpc';
import Peer from '../Peer';
import Wallet from '../Wallet';

export default class Node extends Model {
  static entity = 'nodes';

  static primaryKey = 'peerId';

  static fields() {
    return {
      peerId: this.attr(''),
      ipAddress: this.attr('77.68.110.197'),
      status: this.attr(''),
      version: this.attr(''),
      reputation: this.attr(''),
      peers: this.hasMany(Peer, 'nodeId'),
      wallet: this.hasOne(Wallet, 'nodeId'),
    };
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
