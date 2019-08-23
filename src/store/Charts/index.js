import { Model } from '@vuex-orm/core';

export default class Charts extends Model {
  static entity = 'charts';

  static fields() {
    return {
      id: this.attr(''),
      labels: this.attr(''),
      datasets: this.attr(''),
    };
  }
}
