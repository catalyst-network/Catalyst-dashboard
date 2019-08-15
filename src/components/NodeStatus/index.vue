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
      <div class="q-gutter-y-md">
        <div class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('status') }}:
          </div>
          <div class="col text-right text-caption">
            <span
              v-if="online"
              class="dot bg-green"
            />
            <span
              v-if="!online"
              class="dot bg-red"
            />
            {{ peer.lastSeen }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-2 text-secondary default-font-bold text-uppercase">
            {{ $t('peerId') }}:
          </div>
          <div class="col overflow text-right text-caption">
            {{ node.peerId }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('reputation') }}:
          </div>
          <div class="col text-right text-caption">
            {{ node.reputation }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('version') }}:
          </div>
          <div class="col text-right text-caption">
            {{ node.version }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import Node from '../../store/Node';
import Peer from '../../store/Peer';

export default {
  name: 'NodeStatus',
  computed: {
    node() {
      return Node.all()[0];
    },
    peer() {
      return Peer.find(this.node.peerId);
    },
    online() {
      return this.peer.lastSeen === 'Online now';
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
