import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Node from './Node';
import Peer from './Peer';
import Network from './Network';
import Wallet from './Wallet';

// import example from './module-example'

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(Node);
database.register(Peer);
database.register(Wallet);

window.Node = Node;
window.Peer = Peer;
window.Wallet = Wallet;
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Network,
    },
    plugins: [VuexORM.install(database)],
  });

  return Store;
}
