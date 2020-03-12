import { Model } from '@vuex-orm/core';

export default class Wallet extends Model {
  static entity = 'wallets';

  static primaryKey = 'address';

  static fields() {
    return {
      balance: this.attr(''),
      nodeId: this.attr(''),
      address: this.attr(''),
      secret: this.attr(''),
    };
  }
}
