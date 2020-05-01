<template>
  <div>
    <div class="row justify-start">
      <div class="col">
        <q-avatar
          color="primary"
          text-color="secondary"
          size="28px"
        >
          <img
            v-if="identicon"
            :src="identicon"
          >
        </q-avatar>
        node account
      </div>
      <div class="col text-right text-secondary text-weight-bold">
        0 KAT
      </div>
    </div>
    <div
      class="row q-mt-sm justify-between text-negative"
      style="width: 100%; font-size: 18px;"
    >
      <div class="col-12">
        <q-input
          v-model="amount"
          autofocus
          dark
          dense
          filled
          color="negative"
          label="amount to send"
        >
          <template v-slot:prepend>
            <q-icon
              name="far fa-credit-card"
              color="secondary"
              size="15px"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div
      class="row q-mt-sm justify-between text-negative"
      style="width: 100%; font-size: 18px;"
    >
      <div class="col-12">
        <q-input
          v-model="receiver"
          dark
          dense
          filled
          color="negative"
          label="catalyst address to receive"
        >
          <template v-slot:prepend>
            <q-icon
              name="far fa-user-circle"
              color="secondary"
              size="15px"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-mt-sm q-gutter-x-md justify-center">
      <!-- <q-btn
        round
        unelevated
        color="primary"
        icon="fas fa-times-circle"
      /> -->
      <q-btn
        round
        unelevated
        color="primary"
        icon="fas fa-check-circle"
        class="q-mb-none q-pb-none"
        content-class="q-mb-none q-pb-none"
      >
        <q-tooltip
          class="q-mt-none q-pt-none"
          content-class="bg-primary q-pt-none q-mt-none"
        >
          Send Transaction
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script>
import blockies from 'blockies-identicon';

export default {

  name: 'Send',

  data() {
    return {
      amount: null,
      receiver: null,
    };
  },

  computed: {
    identicon() {
      const icon = blockies.create({ seed: 'wallet.address' });
      return icon.toDataURL();
    },
  },

  methods: {
    async createTx() {
      console.log('tx');
    },
  },
};
</script>
