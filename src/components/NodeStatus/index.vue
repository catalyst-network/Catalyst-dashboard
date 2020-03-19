<template>
  <q-card
    flat
    bordered
    class="top-row bg-info"
  >
    <q-card-section>
      <div
        class="text-h6 default-font-bold text-warning"
      >
        {{ $t('nodeStatus') }}
      </div>
    </q-card-section>
    <q-card-section>
      <span class="q-gutter-y-md">
        <span class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('status') }}:
          </div>
          <span class="col text-right text-caption">
            <span
              v-if="peer"
              style="padding-right:5px"
            >{{ status }}</span>
            <span
              v-if="status === 'online'"
              class="dot bg-green"
            />
            <span
              v-if="status === 'syncing'"
              class="dot bg-yellow"
            />
            <span
              v-if="status === 'offline'"
              class="dot bg-red"
            />
          </span>
        </span>
        <div class="row justify-between">
          <div class="col-2 text-secondary default-font-bold text-uppercase">
            {{ $t('peerId') }}:
          </div>
          <div
            v-if="node"
            class="col overflow text-right text-caption"
          >
            {{ toAddress(node.peerId) }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('reputation') }}:
          </div>
          <div class="col text-right text-caption">
            <span v-if="peer">{{ peer.rating }}%</span>
          </div>
        </div>
        <div class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('version') }}:
          </div>
          <div
            v-if="node"
            class="col text-right text-caption"
          >
            {{ node.version }}
          </div>
        </div>
      </span>
    </q-card-section>
  </q-card>
</template>

<script>
import Node from '../../store/Node';
import Peer from '../../store/Peer';
import { publicKeyToAddress } from '../../helpers/Common';

export default {
  name: 'NodeStatus',

  data() {
    return {
      toAddress: publicKeyToAddress,
    };
  },

  computed: {
    node() {
      return Node.all()[0];
    },
    peer() {
      if (this.node) {
        return Peer.find(this.node.peerId);
      }
      return null;
    },
    status() {
      if (this.node.syncing) {
        return 'syncing';
      }

      const now = Date.now();
      if (this.node) {
        if ((now - this.peer.lastSeen) > 20000) {
          return 'offline';
        }
        return 'online';
      }
      return 'offline';
    },
    online() {
      return this.status === 'Online';
    },

  },
};
</script>

<style>
.break {
  word-break: break-all;
}
.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
</style>
