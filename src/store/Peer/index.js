import { Model } from '@vuex-orm/core';

export default class Peer extends Model {
  static entity = 'peers';

  static primaryKey = 'peerId';

  static fields() {
    return {
      peerId: this.attr(''),
      nodeId: this.attr(''),
      address: this.attr(''),
      location: this.attr(''),
      isValidator: this.attr(''),
      latency: this.attr(''),
      uptime: this.attr(''),
      reputation: this.attr(''),
      created: this.attr(''),
      modified: this.attr(''),
      lastSeen: this.attr(''),
      blacklisted: this.attr(''),
      isAwolPeer: this.attr(''),
      inactiveFor: this.attr(''),
    };
  }
}
