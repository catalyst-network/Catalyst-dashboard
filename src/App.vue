<template>
  <div
    v-if="!loading"
    id="q-app"
  >
    <router-view />
    <q-inner-loading
      dark
      :showing="loading"
    >
      <q-spinner
        size="75px"
        color="secondary"
      />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import ERPC from '@etclabscore/ethereum-json-rpc';
import Node from './store/Node';
import RefreshPeers from './helpers/UpdatePeers';
import { refreshMempool, updateBalance } from './helpers/UpdateMempool';
import Charts from './store/Charts';
import { loadNode, isSyncing, loadCharts } from './helpers/LoadNode';


export default {
  name: 'App',

  data() {
    return {
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
    this.$store.dispatch('Settings/setLoading', true);
    await loadNode('3S3VLMIVYOOX7HYUK6ZBPITI5LFVNVP2BTWOUBGP6I3UI5X4NYDQ', '77.68.110.197');
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
          ledgerTimeChart.labels.push('');
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

        this.$store.dispatch('Network/setLastLedgerTime', latestDelta.timestamp);
      }
    },
  },
};
</script>
