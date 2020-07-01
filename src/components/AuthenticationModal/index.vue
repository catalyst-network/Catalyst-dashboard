<template>
  <q-dialog
    v-model="display"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="bg-negative text-primary"
      style="width: 300px"
    >
      <q-card-section>
        <div class="text-h6 text-center">
          Authentication Required
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-center">
        Enter your node password
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          ref="passwordInput"
          v-model="password"
          autofocus
          dense
          outlined
          :error="error"
          :loading="loading"
          bg-color="white"
          color="black"
          type="password"
          placeholder="Password"
          :error-message="errorMessage"
          @keydown.enter.prevent="getWallet"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="bg-negative text-primary"
      >
        <q-btn
          flat
          label="CANCEL"
          @click="$emit('authFail')"
        />
        <q-btn
          flat
          label="OK"
          @click="getWallet"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { getWalletFromKeystore } from '../../helpers/AddNode';

export default {
  name: 'AuthenticationModal',

  props: {
    display: {
      required: true,
      type: Boolean,
    },
    keystore: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      password: null,
      error: false,
      errorMessage: null,
      loading: false,
    };
  },

  methods: {
    async getWallet() {
      this.loading = true;

      try {
        const wallet = await getWalletFromKeystore(this.keystore, this.password);
        console.log(wallet);
        this.$emit('authSuccess', wallet);
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.password = null;
        this.error = true;
        this.errorMessage = e.message;
        this.$refs.passwordInput.focus();
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
.q-field--error .q-field__bottom {
  color: red;
}
</style>
