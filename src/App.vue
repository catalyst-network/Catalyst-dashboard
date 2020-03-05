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
// import { refreshMempool, updateBalance } from './helpers/UpdateMempool';
import Charts from './store/Charts';

export default {
  name: 'App',

  data() {
    return {
      lastLedgerTxCount: null,
    };
  },

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
    const charts = Charts.all();
    if (!charts || charts.length < 2) {
      Charts.insert({
        data: {
          id: 'transactions',
          labels: new Array(50).fill(''),
          datasets: [{
            backgroundColor: '#16ac9f',
            data: new Array(50).fill(0),
          }],
        },
      });

      Charts.insert({
        data: {
          id: 'ledgerTime',
          labels: new Array(50).fill(''),
          datasets: [{
            backgroundColor: '#16ac9f',
            data: new Array(50).fill(19),
          }],
        },
      });
    }

    setInterval(() => {
      RefreshPeers();
      // refreshMempool();
      // updateBalance();
      // this.updateNetwork();
    }, 20000);

    // this.mockChartData();
  },

  methods: {
    async updateNetwork() {
      const newLedgerCycles = await this.$axios.get(`${process.env.NODE_API}/api/Ledger/GetTotalDeltaCount`);
      console.log('ledger cycles: ', newLedgerCycles.data);
      console.log(this.network);
      if (newLedgerCycles.data !== this.network.ledgerCycles) {
        const txChart = Charts.find('transactions');
        txChart.labels.push(this.network.ledgerCycles);
        txChart.labels.shift();
        Charts.update({
          where: 'transactions',
          data: { labels: txChart.labels },
        });
        this.$store.dispatch('Network/setLedgerCycles', newLedgerCycles.data);

        const ledgerTimeChart = Charts.find('ledgerTime');
        ledgerTimeChart.labels.push('');
        ledgerTimeChart.labels.shift();
        ledgerTimeChart.datasets[0].data.push((Date.now() - this.network.lastLedgerTime / 100));
        ledgerTimeChart.datasets[0].data.shift();

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
        this.$store.dispatch('Network/setLastLedgerTime', Date.now());
        // const txCount = this.network.totalTxs + 20;
        const txCount = Charts.find('transactions').datasets[0].data[49];
        this.$store.dispatch('Network/setTotalTxs', txCount);
      }

      const latestDelta = await this.$axios.get(`${process.env.NODE_API}/api/Ledger/GetLatestDelta`);
      console.log('ledger delta: ', latestDelta.data);

      if (latestDelta.data !== this.network.lastLedgerDelta) {
        this.$store.dispatch('Network/setLastLedgerDelta', latestDelta.data);
      }
    },

    mockChartData() {
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let ledgerCycles = 1;

      setInterval(() => {
        const txChart = Charts.find('transactions');
        txChart.labels.push(`Ledger Cycle: ${ledgerCycles}`);
        txChart.labels.shift();
        const newTxs = getRandomInt(19, 25);
        txChart.datasets[0].data.push(newTxs);
        txChart.datasets[0].data.shift();

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

        const ledgerTimeChart = Charts.find('ledgerTime');
        ledgerTimeChart.labels.push('');
        ledgerTimeChart.labels.shift();
        ledgerTimeChart.datasets[0].data.push(5);
        ledgerTimeChart.datasets[0].data.shift();

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

        const txCount = this.network.totalTxs + newTxs;
        this.$store.dispatch('Network/setTotalTxs', txCount);
        ledgerCycles += 1;
      }, 5000);
    },
  },
};
</script>

<style>
</style>
