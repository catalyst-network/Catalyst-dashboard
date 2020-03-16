import Vue from 'vue';

const wallet = {

  async loadWalletLib() {
    return import('@catalyst-net-js/wasm-ed25519ph');
  },
};
Vue.prototype.$wallet = wallet;
