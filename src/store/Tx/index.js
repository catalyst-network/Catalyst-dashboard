import { Model } from '@vuex-orm/core';

export default class Tx extends Model {
  static entity = 'txs';

  static primaryKey = 'txHash';

  static fields() {
    return {
      txHash: this.attr(''),
      to: this.attr(''),
      from: this.attr(''),
      amount: this.attr(''),
      time: this.attr(''),
    };
  }
}
