<template>
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <div class="text-h6 default-font-bold text-primary">
        {{ $t('networkStatus') }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-y-md">
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
              {{ network.ledgerCycles }}
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
              {{ network.avLedgerTime }}
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
          <q-separator
            vertical
            color="secondary"
          />
          <div class="column">
            <div
              class="col-auto default-font-bold
             text-secondary text-uppercase small-text text-caption"
            >
              {{ $t('walletAddresses') }}
            </div>
            <div class="col-auto text-h6">
              {{ network.walletAddrs }}
            </div>
          </div>
        </div>
        <div class="row justify-end text-primary">
          {{ $t('lastLedger') }} {{ timer }}s {{ $t('ago') }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'NetworkStatus',
  data() {
    return {
      network: {
        ledgerCycles: 12345,
        avLedgerTime: 14.2,
        totalTxs: 143536,
        walletAddrs: 23940,
      },
      timer: 0,
    };
  },
  mounted() {
    this.timeSinceLastLedger();
  },
  methods: {
    timeSinceLastLedger() {
      setInterval(() => {
        if (this.timer > 14) {
          this.timer = -1;
          this.network.ledgerCycles += 1;
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
</style>
