<template>
  <q-card
    flat
    bordered
    class="my-card"
  >
    <q-card-section>
      <div class="text-h6 default-font-bold text-primary">
        {{ $t('connectedPeers') }}
      </div>
    </q-card-section>
    <q-card-section>
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
          {{ $t('isValidator') }}
        </div>
        <div class="col text-right text-uppercase text-secondary default-font-bold">
          {{ $t('latency') }}
        </div>
        <div class="col text-right text-uppercase text-secondary default-font-bold">
          {{ $t('uptime') }}
        </div>
      </div>
      <q-scroll-area class="peer-scrollarea">
        <PeerListItem
          v-for="peer in peerList"
          :key="peer.peerId"
          :peer="peer"
        />
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
import PeerListItem from './PeerListItem';
import Peer from '../../store/Peer';


export default {
  name: 'PeerList',
  components: {
    PeerListItem,
  },
  computed: {
    peerList() {
      return Peer.all();
    },
  },
};
</script>

<style>
.peer-header {
  padding-bottom: 0.75rem;
}
.peer-item {
  padding: 0.75rem 0;
  border-top: 1px solid rgba(0,0,0,0.12);
  color:darkslategrey;
}
.peer-scrollarea {
  height: 200px;
  max-height: 300px;
}
</style>
