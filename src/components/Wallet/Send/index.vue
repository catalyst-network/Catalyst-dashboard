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
        {{ wallet.katBalance }} KAT
      </div>
    </div>
    <div
      class="row q-mt-sm justify-between text-negative"
      style="width: 100%; font-size: 18px;"
    >
      <div class="col-12 send-input">
        <q-input
          ref="amountInput"
          v-model="amount"
          autofocus
          dark
          dense
          filled
          color="negative"
          label="amount to send"
          lazy-rules
          :rules="[ val => val && val < wallet.katBalance]"
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
      <div class="col-12 send-input">
        <q-input
          ref="receiverInput"
          v-model="receiver"
          dark
          dense
          filled
          color="negative"
          label="catalyst address to receive"
          lazy-rules
          :rules="[ val => val && val.length === 42]"
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
        :disable="!amount || !receiver"
        color="primary"
        icon="fas fa-check-circle"
        @click="createTx"
      >
        <q-tooltip
          content-style="background: none;"
          anchor="bottom middle"
          self="top middle"
          :offset="[0, 0]"
        >
          Send Transaction
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script>
import blockies from 'blockies-identicon';
import Wallet from '../../../store/Wallet';
// import { getNonce, createTx } from '../../../SendTx';


export default {

  name: 'Send',

  data() {
    return {
      amount: null,
      receiver: null,
    };
  },

  computed: {
    wallet() {
      return Wallet.all()[0];
    },
    identicon() {
      const icon = blockies.create({ seed: this.wallet.address });
      return icon.toDataURL();
    },
  },

  methods: {
    async createTx() {
      if (this.$refs.amountInput.hasError) {
        this.$q.notify({
          message: 'not enough balance',
          color: 'red',
        });
      } else if (this.$refs.receiverInput.hasError) {
        this.$q.notify({
          message: 'invalid receiver address',
          color: 'red',
        });
      }
      // const tx = await this.wallet.createTx(this.receiver, this.amount);
      // this.$emit('sendTransaction', tx);
    },
  },
};
</script>
<style lang="scss">
.send-input {
   .q-field--error .q-field__bottom {
  display: none;
  }
  .q-field--with-bottom {
    padding-bottom: 0;
}
}
</style>
