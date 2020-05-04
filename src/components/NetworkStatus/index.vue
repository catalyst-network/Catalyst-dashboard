<template>
  <q-card
    flat
    bordered
    class="top-row bg-info"
  >
    <q-card-section>
      <div class="text-h6 default-font-bold text-warning">
        {{ $t('networkStatus') }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-y-lg">
        <div class="row q-gutter-x-md">
          <q-separator
            vertical
            color="secondary"
          />

          <div class="column">
            <div
              class="col-auto default-font-bold
             text-secondary text-uppercase small-text text-caption break"
            >
              {{ $t('totalLedgerCycles') }}
            </div>
            <div class="col-auto text-h6">
              {{ deltas }}
            </div>
          </div>
          <q-separator
            vertical
            color="secondary"
          />
          <div class="column">
            <div
              class="col-auto default-font-bold
               text-secondary text-uppercase small-text text-caption break"
            >
              {{ $t('averageLedgerTime') }}
            </div>
            <div class="col-auto text-h6">
              {{ network.avLedgerTime }}s
            </div>
          </div>
        </div>

        <div class="row q-gutter-x-md">
          <q-separator
            vertical
            color="secondary"
          />
          <div class="column">
            <div
              class="col-auto default-font-bold
             text-secondary text-uppercase small-text text-caption"
            >
              {{ $t('totalTransactions') }}
            </div>
            <div class="col-auto text-h6">
              {{ network.totalTxs }}
            </div>
          </div>
          <!-- <q-separator
            vertical
            color="secondary"
          /> -->
          <!-- <div class="column">
            <div
              class="col-auto default-font-bold
             text-secondary text-uppercase small-text text-caption"
            >
              {{ $t('walletAddresses') }}
            </div>
            <div class="col-auto text-h6">
              {{ network.walletAddrs }}
            </div>
          </div> -->
        </div>
        <div
          class="row"
          style="margin-top: 5px"
        />
        <div class="row justify-end text-warning text-uppercase default-font-bold">
          {{ $t('lastLedger') }}:
          <span class="ledger-timer">{{ timer }}s {{ $t('ago') }}</span>
          <!-- <span class="ledger-timer">
            {{ new Date(network.lastLedgerTime).toTimeString().substring(0, 8) }}
          </span> -->
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex';
import Node from '../../store/Node';


export default {
  name: 'NetworkStatus',
  data() {
    return {
      timer: 0,
    };
  },
  computed: {
    ...mapState({
      network: (state => state.Network),
      selectedNode: (state => state.Settings.selectedNode),
    }),
    deltas() {
      const { syncing } = Node.find(this.selectedNode);
      if (syncing) return `${parseInt(syncing.currentBlock, 16)} / ${parseInt(syncing.highestBlock, 16)}`;
      return this.network.ledgerCycles;
    },
  },
  mounted() {
    this.timeSinceLastLedger();
  },
  methods: {
    timeSinceLastLedger() {
      let lastLedger = this.network.lastLedgerTime;

      setInterval(async () => {
        if (this.network.lastLedgerTime > lastLedger) {
          this.timer = -1;
          lastLedger = this.network.lastLedgerTime;
        }
        this.timer += 1;
      }, 1000);
    },
  },
};
</script>

<style>
.small-text {
    font-size: 0.75rem;
}

.break {
  word-break: break-all;
}

.q-separator--vertical {
    width: 3px;
}

.ledger-timer {
    margin-left: 3px;
}
</style>
