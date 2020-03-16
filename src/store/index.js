import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
// import VuexPersist from 'vuex-persist';
import Node from './Node';
import Peer from './Peer';
import Network from './Network';
import Wallet from './Wallet';
import Tx from './Tx';
import Settings from './Settings';
import Charts from './Charts';

// import example from './module-example'

Vue.use(Vuex);

const database = new VuexORM.Database();

// const vuexPersist = new VuexPersist({
//   key: 'node-dashboard',
//   storage: localStorage,
// });

database.register(Node);
database.register(Peer);
database.register(Wallet);
database.register(Tx);
database.register(Charts);


// window.Node = Node;
// window.Peer = Peer;
// window.Wallet = Wallet;
// window.Tx = Tx;
// window.Charts = Charts;
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Network,
      Settings,
    },
    plugins: [VuexORM.install(database)],
  });

  return Store;
}
