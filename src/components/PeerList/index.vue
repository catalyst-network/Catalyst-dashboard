<template>
  <q-card
    flat
    bordered
    class="bg-info"
  >
    <q-card-section>
      <div class="row justify-between">
        <div class="text-h6 default-font-bold text-warning">
          {{ $t('connectedPeers') }}
        </div>
        <div class="text-warning text-uppercase default-font-bold">
          {{ $t('activeNodes') }}: {{ activeNodes }}/{{ node.peers.length }}
        </div>
      </div>
    </q-card-section>
    <q-card-section
      style="padding:16px 0"
    >
      <div class="row peer-header">
        <div class="col-4 text-left text-uppercase text-secondary default-font-bold">
          {{ $t('peerId') }}
        </div>
        <div class="col text-right text-uppercase text-secondary default-font-bold">
          {{ $t('address') }}
        </div>
        <div class="col text-right text-uppercase text-secondary default-font-bold">
          {{ $t('location') }}
        </div>
        <div class="col text-right text-uppercase text-secondary default-font-bold">
          {{ $t('reputation') }}
        </div>
        <div class="col text-right text-uppercase text-secondary default-font-bold">
          {{ $t('created') }}
        </div>
        <div class="col text-right text-uppercase text-secondary default-font-bold">
          {{ $t('lastSeen') }}
        </div>
      </div>
      <q-scroll-area class="peer-scrollarea">
        <PeerListItem
          v-for="peer in node.peers"
          :key="peer.peerId"
          :peer="peer"
        />
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
import PeerListItem from './PeerListItem';
import Node from '../../store/Node';

export default {
  name: 'PeerList',
  components: {
    PeerListItem,
  },
  computed: {
    node() {
      return Node.query().withAll().first();
    },
    activeNodes() {
      const active = this.node.peers.filter(peer => peer.lastSeen === 'Online now');
      return active.length;
    },
  },
};
</script>

<style>
.peer-header {
  padding: 0 16px;
  padding-bottom: 0.75rem;
}
.peer-item {
  padding: 0.75rem 16px;
  border-top: 1px solid rgba(0,0,0,0.12);
  color:darkslategrey;
}
.peer-scrollarea {
  height: 246px;
  max-height: 300px;
}
</style>
