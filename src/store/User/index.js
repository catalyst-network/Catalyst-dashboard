import { Model } from '@vuex-orm/core';
import { colors } from 'quasar';

import Node from '../Node';
import Wallet from '../Wallet';

export default class User extends Model {
  static entity = 'users';

  static fields() {
    return {
      id: this.uid(),
      name: this.attr(''),
      darkMode: this.boolean(true),
      nodes: this.hasMany(Node, 'userId'),
      wallet: this.hasMany(Wallet, 'userId'),
    };
  }

  static mutators() {
    return {
      darkMode(value) {
        function setDarkMode() {
          colors.setBrand('primary', '#0a2d3e');
          colors.setBrand('accent', '#19445b');
          colors.setBrand('negative', '#eee');
          colors.setBrand('info', '#0a2d3e');
          colors.setBrand('warning', '#eee');
        }

        function setLightMode() {
          colors.setBrand('primary', '#19445b');
          colors.setBrand('accent', '#f6f7f9');
          colors.setBrand('negative', '#000000');
          colors.setBrand('info', '#ffffff');
          colors.setBrand('warning', '#19445b');
        }

        if (value) setDarkMode();
        else setLightMode();

        return value;
      },
    };
  }
}
