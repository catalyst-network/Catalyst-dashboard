<template>
  <div class="column justify-center q-pa-md">
    <div
      v-if="!json"
      class="col-auto justify-center text-center"
    >
      <div class="row text-center justify-center">
        Add your keystore to view your wallet
      </div>
      <div class="row justify-center">
        <q-file
          v-model="file"
          label="keystore file"
          color="negative"
          :error="!isValid"
          :error-message="error"
          standout="bg-secondary text-white"
          dark
          use-chips
          style="max-width: 300px"
          input-style="color: white;"
        >
          <template v-slot:error>
            {{ $t('invalidKeystoe') }}
          </template>
        </q-file>
      </div>
    </div>
    <div
      v-else
      class="col-auto"
    >
      <q-input
        v-model="pwd"
        :label="$t('password')"
        :type="isPwd ? 'password' : 'text'"
        :error="!isValid"
        dark
        filled
        class="q-my-sm justify-center signing-key"
        color="negative"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
        <template v-slot:error>
          {{ $t('wrongPassword') }}
        </template>
      </q-input>
    </div>
    <div class="col-auto">
      <div class="row justify-center">
        <q-btn
          outline
          :label="json ? $t('import keystore') : $t('add')"
          :disable="json ? !pwd : !file"
          color="white"
          @click="json ? importKey() : validateKey()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { loadKeystore, getPrivateKey, getWallet } from '../../../helpers/SendTx';

export default {
  name: 'LoadKeystore',
  data() {
    return {
      isValid: true,
      pwd: null,
      isPwd: true,
      json: null,
      file: null,
      error: null,
    };
  },

  methods: {
    async validateKey() {
      try {
        this.json = await loadKeystore(this.file);
      } catch (e) {
        this.isValid = false;
      }
    },

    toHexString(byteArray) {
      // eslint-disable-next-line no-bitwise
      return Array.prototype.map.call(byteArray, byte => (`0${(byte & 0xFF).toString(16)}`).slice(-2)).join('');
    },

    async importKey() {
      const key = await getPrivateKey(this.pwd, this.json);
      console.log(key);
      const wallet = await getWallet(key);
      console.log('wallet: ', wallet);
      const hexKey = this.toHexString(key);
      this.$q.localStorage.set('catalyst-node-key', hexKey);
    },
  },
};
</script>
<style lang="scss">

.q-field__native {
    width: 100%;
    min-width: 0;
    outline: 0 !important;
    color: white
}

.q-file .q-chip {
  background: none;
}

</style>
