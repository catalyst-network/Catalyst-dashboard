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
          {{ $t('activeNodes') }}: {{ activeNodes }} / {{ peers.length }}
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
          {{ $t('Status') }}
        </div>
      </div>
      <q-scroll-area class="peer-scrollarea">
        <PeerListItem
          v-for="peer in peers"
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
import Peer from '../../store/Peer';

export default {
  name: 'PeerList',
  components: {
    PeerListItem,
  },
  computed: {
    node() {
      return Node.query().withAll().first();
    },
    peers() {
      if (this.node) return this.node.peers;
      return [];
    },
    activeNodes() {
      if (this.node) {
        const active = this.node.peers.filter((peer) => {
          const now = Date.now();
          if ((now - peer.lastSeen) > 20000) {
            return false;
          }
          return true;
        });
        return active.length;
      }
      return 0;
    },
  },

  mounted() {
    // setInterval(async () => {
    //   await this.refreshPeers();
    // }, 5000);
  },

  methods: {
    async refreshPeers() {
      const peerApi = await this.$axios.get('http://51.91.51.88:5005/api/peer');
      const peers = peerApi.data.map(peer => ({
        peerId: peer.PeerIdentifier.PublicKey,
        nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
        address: peer.PeerIdentifier.Ip,
        created: peer.Created,
        blacklisted: peer.Blacklisted,
        modified: peer.Modified,
        lastSeen: new Date(peer.LastSeen).getTime(),
        isAwolPeer: peer.IsAwolPeer,
        inactiveFor: peer.InactiveFor,
      }));

      Peer.insert({ data: peers });
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
}
.peer-scrollarea {
  height: 246px;
  max-height: 300px;
}
</style>
