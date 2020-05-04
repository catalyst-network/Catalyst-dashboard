<template>
  <q-layout
    view="hHh LpR fFf"
    class="bg-accent"
  >
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-primary text-negative"
      class="sidebar"
      :width="205"
    >
      <Sidebar />
    </q-drawer>

    <q-page-container
      class="text-negative"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
// import ERPC from '@etclabscore/ethereum-json-rpc';
import Node from '../store/Node';
import User from '../store/User';
import RefreshPeers from '../helpers/UpdatePeers';
import { refreshMempool, updateBalance } from '../helpers/UpdateMempool';
import Charts from '../store/Charts';
import { isSyncing, loadCharts } from '../helpers/LoadNode';
import Sidebar from '../components/Sidebar';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,

  },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      lastLedgerTxCount: null,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      network: (state => state.Network),
    }),
    node() {
      return Node.all()[0] ? Node.all()[0] : null;
    },
    rpc() {
      return this.node ? this.node.rpc : null;
    },
  },

  async mounted() {
    Window.$store = this.$store;
    this.$store.dispatch('Settings/setLoading', true);
    User.insert({
      data: {
        darkMode: true,
      },
    });
    // await loadNode('ETHAY56IVYMEFUZEJDCK7HEK5Y7G2B5FRYXL5HMWKA74ORWI7RZQ', '77.68.110.194');
    const update = () => {
      isSyncing();
      loadCharts();
      RefreshPeers();
      refreshMempool(this.rpc);
      updateBalance(this.rpc);
      this.updateNetwork();
    };

    setInterval(update, 5000);
    await update();
    this.$store.dispatch('Settings/setLoading', false);
  },

  methods: {
    async updateNetwork() {
      const latestDelta = await this.rpc.eth_getBlockByNumber('latest', true);
      console.log('ledger delta: ', latestDelta);
      this.$store.dispatch('Network/setLedgerCycles', parseInt(latestDelta.number, 16));

      if (latestDelta.hash !== this.network.lastLedgerDelta) {
        this.$store.dispatch('Network/setLastLedgerDelta', latestDelta.hash);

        if (this.network.lastLedgerTime) {
          const ledgerTimeChart = Charts.find('ledgerTime');
          ledgerTimeChart.labels.push(`Delta ${parseInt(latestDelta.number, 16)}`);
          ledgerTimeChart.labels.shift();
          ledgerTimeChart.datasets[0].data.push(
            (latestDelta.timestamp - this.network.lastLedgerTime),
          );
          ledgerTimeChart.datasets[0].data.shift();
          const sum = ledgerTimeChart.datasets[0].data.reduce((a, b) => a + b, 0);
          const avg = (sum / ledgerTimeChart.datasets[0].data.length) || 0;
          this.$store.dispatch('Network/setAvLedgerTime', avg);

          Charts.update({
            where: 'ledgerTime',
            data: {
              labels: ledgerTimeChart.labels,
              datasets: [{
                data: ledgerTimeChart.datasets[0].data,
                backgroundColor: ledgerTimeChart.datasets[0].backgroundColor,
              }],
            },
          });
        }
        const txChart = Charts.find('transactions');
        if (txChart) {
          txChart.labels.push('');
          txChart.labels.shift();
          txChart.datasets[0].data.push(latestDelta.transactions.length);
          txChart.datasets[0].data.shift();
          const sum = txChart.datasets[0].data.reduce((a, b) => a + b, 0);
          this.$store.dispatch('Network/setTotalTxs', sum);
          Charts.update({
            where: 'transactions',
            data: {
              labels: txChart.labels,
              datasets: [{
                data: txChart.datasets[0].data,
                backgroundColor: txChart.datasets[0].backgroundColor,
              }],
            },
          });
        }

        this.$store.dispatch('Network/setLastLedgerTime', latestDelta.timestamp);
      }
    },
  },
};
</script>
<style>
.sidebar {
    width: inerit;
}
</style>
