import { Model } from '@vuex-orm/core';
import Peer from '../Peer';
import Wallet from '../Wallet';

export default class Node extends Model {
  static entity = 'nodes';

  static primaryKey = 'peerId';

  static fields() {
    return {
      peerId: this.attr(''),
      status: this.attr(''),
      version: this.attr(''),
      reputation: this.attr(''),
      peers: this.hasMany(Peer, 'nodeId'),
      wallet: this.hasOne(Wallet, 'nodeId'),
    };
  }
}
