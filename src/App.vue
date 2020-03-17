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
import Wallet from './store/Wallet';
import RefreshPeers from './helpers/UpdatePeers';
import { refreshMempool, updateBalance } from './helpers/UpdateMempool';
import Charts from './store/Charts';
import { publicKeyToAddress, getBlocks } from './helpers/Common';


export default {
  name: 'App',

  data() {
    return {
      lastLedgerTxCount: null,
      loading: true,
    };
  },

  computed: {
    ...mapState({
      network: (state => state.Network),
    }),
    rpc() {
      if (Node.all()[0]) return Node.all()[0].rpc;
      return null;
    },
  },

  async mounted() {
    this.loading = true;

    await this.start();

    const update = () => {
      RefreshPeers();
      refreshMempool();
      updateBalance();
      this.updateNetwork();
    };

    setInterval(update, 5000);
    await update();
    this.loading = false;
  },

  methods: {
    async start() {
      Node.create({
        data: {
          status: 'online',
          version: '0.12',
          peerId: '3S3VLMIVYOOX7HYUK6ZBPITI5LFVNVP2BTWOUBGP6I3UI5X4NYDQ',
          ipAddress: '77.68.110.197',
          reputation: 97,
        },
      });
      const address = publicKeyToAddress(Node.all()[0].peerId);

      // if (this.$q.localStorage.getItem(address)) {
      Wallet.create({
        data: {
          address,
          nodeId: Node.all()[0].peerId,
        },
      });
      // } else {
      //   Wallet.create({
      //     data: [],
      //   });
      // }
      console.log(this.rpc);
      const blockHeight = await this.rpc.eth_blockNumber();
      let blocks;
      if (blockHeight >= 50) {
        blocks = await getBlocks((blockHeight - 49), blockHeight, this.rpc);
      } else {
        blocks = await getBlocks(0, blockHeight, this.rpc);
      }

      const txs = blocks.map(({ transactions }) => transactions.length);
      for (let i = 0; i < (50 - txs.length); i += 1) {
        txs.unshift(0);
      }

      const deltaTimes = blocks.map(({ timestamp }, i) => {
        if (blocks[i + 1]) {
          return -(parseInt(timestamp, 16) - parseInt(blocks[i + 1].timestamp, 16));
        }
        return null;
      }).filter(Number);
      for (let i = 0; i < (50 - deltaTimes.length); i += 1) {
        deltaTimes.unshift(0);
      }

      const charts = Charts.all();
      if (!charts || charts.length < 2) {
        Charts.insert({
          data: {
            id: 'transactions',
            labels: new Array(50).fill(''),
            datasets: [{
              backgroundColor: '#16ac9f',
              data: txs,
            }],
          },
        });

        Charts.insert({
          data: {
            id: 'ledgerTime',
            labels: new Array(50).fill(''),
            datasets: [{
              backgroundColor: '#16ac9f',
              data: deltaTimes,
            }],
          },
        });
      }
    },

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

<style lang="stylus" scoped>

.q-inner-loading--dark
  background $primary

</style>
