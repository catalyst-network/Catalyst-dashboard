import { Model } from '@vuex-orm/core';

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
}
