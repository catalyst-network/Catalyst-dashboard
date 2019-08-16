<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Node from './store/Node';
import Wallet from './store/Wallet';
import RefreshPeers from './helpers/UpdatePeers';
import { refreshMempool, updateBalance } from './helpers/UpdateMempool';

export default {
  name: 'App',

  computed: {
    ...mapState({
      network: (state => state.Network),
    }),
  },

  async mounted() {
    Node.insert({
      data: {
        status: 'online',
        version: '0.12',
        peerId: 'VkC84TBQOVjrcX81NYV5swPVrE4RN+nKGzIjxNT2AY0=',
        reputation: 97,
      },
    });

    Wallet.insertOrUpdate({
      data: {
        address: 'VkC84TBQOVjrcX81NYV5swPVrE4RN+nKGzIjxNT2AY0=',
        nodeId: 'VkC84TBQOVjrcX81NYV5swPVrE4RN+nKGzIjxNT2AY0=',
      },
    });
    setInterval(() => {
      RefreshPeers();
      refreshMempool();
      updateBalance();
      this.updateNetwork();
    }, 2000);
  },

  methods: {
    async updateNetwork() {
      const newLedgerCycles = await this.$axios.get(`${process.env.NODE_API}/api/Ledger/GetTotalDeltaCount`);
      console.log('ledger cycles: ', newLedgerCycles.data);
      console.log(this.network);
      if (newLedgerCycles.data !== this.network.ledgerCycles) {
        this.$store.dispatch('Network/setLedgerCycles', newLedgerCycles.data);
        this.$store.dispatch('Network/setLastLedgerTime', Date.now());
        const txCount = this.network.totalTxs + 20;
        this.$store.dispatch('Network/setTotalTxs', txCount);
      }

      const latestDelta = await this.$axios.get(`${process.env.NODE_API}/api/Ledger/GetLatestDelta`);
      console.log('ledger delta: ', latestDelta.data);

      if (latestDelta.data !== this.network.lastLedgerDelta) {
        this.$store.dispatch('Network/setLastLedgerDelta', latestDelta.data);
      }
    },
  },
};
</script>

<style>
</style>
