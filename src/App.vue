<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ERPC from '@etclabscore/ethereum-json-rpc';
import Node from './store/Node';
import Wallet from './store/Wallet';
import RefreshPeers from './helpers/UpdatePeers';
import { refreshMempool, updateBalance } from './helpers/UpdateMempool';
import Charts from './store/Charts';
import { publicKeyToAddress } from './helpers/Common';


export default {
  name: 'App',

  data() {
    return {
      lastLedgerTxCount: null,
      rpc: null,
    };
  },

  computed: {
    ...mapState({
      network: (state => state.Network),
    }),
  },

  async mounted() {
    this.rpc = new ERPC({
      transport: {
        host: '192.168.1.45',
        port: 5005,
        type: 'http',
        path: '/api/eth/request',
      },
    });

    this.rpc.eth_chainId().then(console.log);

    Node.insert({
      data: {
        status: 'online',
        version: '0.12',
        peerId: 'GK42OCZ447YBR62MIWNNLYEB7M4UFZDDSGYKHUWJGWOJLRB7PEZQ',
        reputation: 97,
      },
    });
    const address = publicKeyToAddress(Node.all()[0].peerId);

    Wallet.insertOrUpdate({
      data: {
        address,
        nodeId: 'GK42OCZ447YBR62MIWNNLYEB7M4UFZDDSGYKHUWJGWOJLRB7PEZQ',
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
      refreshMempool();
      updateBalance();
      this.updateNetwork();
    }, 5000);

    // this.mockChartData();
  },

  methods: {
    async updateNetwork() {
      // console.log('update network');
      // const newLedgerCycles = await this.rpc.eth_blockNumber();

      // console.log('ledger cycles: ', newLedgerCycles);
      // console.log(this.network);
      // if (newLedgerCycles !== this.network.ledgerCycles) {
      //   const txChart = Charts.find('transactions');
      //   txChart.labels.push(this.network.ledgerCycles);
      //   txChart.labels.shift();
      //   Charts.update({
      //     where: 'transactions',
      //     data: { labels: txChart.labels },
      //   });
      //   this.$store.dispatch('Network/setLedgerCycles', newLedgerCycles);


      //   this.$store.dispatch('Network/setLastLedgerTime', Date.now());
      //   // const txCount = this.network.totalTxs + 20;
      //   const txCount = Charts.find('transactions').datasets[0].data[49];
      //   this.$store.dispatch('Network/setTotalTxs', txCount);
      // }

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
        const avg = (sum / txChart.datasets[0].data.length) || 0;
        this.$store.dispatch('Network/setTotalTxs', avg);
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
