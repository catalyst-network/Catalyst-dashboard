<template>
  <q-card
    flat
    bordered
    class="bg-info"
  >
    <q-card-section>
      <div class="row justify-between">
        <div class="text-h6 default-font-bold text-warning">
          {{ $t('Transactions') }}
        </div>
        <div class="text-warning text-uppercase default-font-bold">
          {{ $t('Txs') }}: {{ txs.length }}
        </div>
      </div>
    </q-card-section>
    <q-card-section
      style="padding:16px 0"
    >
      <div class="row peer-header q-gutter-x-xs">
        <div class="col text-left text-uppercase text-secondary default-font-bold">
          {{ $t('txHash') }}
        </div>
        <div class="col text-left text-uppercase text-secondary default-font-bold">
          {{ $t('peerId') }}
        </div>
        <div class="col text-left text-uppercase text-secondary default-font-bold">
          {{ $t('time') }}
        </div>
        <div class="col-1 text-left text-uppercase text-secondary default-font-bold">
          {{ $t('data') }}
        </div>
      </div>
      <q-scroll-area class="peer-scrollarea">
        <MempoolTx
          v-for="tx in txs"
          :key="tx.txHash"
          :tx="tx"
        />
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
import MempoolTx from './MempoolTx';
import Tx from '../../store/Tx';


export default {
  name: 'Mempool',
  components: {
    MempoolTx,
  },
  computed: {
    txs() {
      function compare(a, b) {
        if (a.time > b.time) {
          return -1;
        }
        if (a.time < b.time) {
          return 1;
        }
        return 0;
      }
      return Tx.all().sort(compare);
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
