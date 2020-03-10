<template>
  <div class="column justify-center">
    <div class="col-auto">
      <q-input
        type="file"
        :error="!isValid"
        color="negative"
        @input="validFile"
      >
        <template v-slot:error>
          {{ $t('invalidKeystoe') }}
        </template>
      </q-input>
    </div>
    <div class="col-auto">
      <q-input
        v-model="pwd"
        :label="$t('password')"
        :type="isPwd ? 'password' : 'text'"
        :error="!isValid"
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
      <q-btn
        outline
        :label="$t('addKey')"
        color="white"
        @click="importFromKey()"
      />
    </div>
  </div>
</template>

<script>
import { loadKeystore, getPrivateKey } from '../../../helpers/SendTx';

export default {
  name: 'LoadKeystore',
  data() {
    return {
      isValid: true,
      pwd: null,
      isPwd: true,
      json: null,
    };
  },

  methods: {
    async validFile(val) {
      // eslint-disable-next-line prefer-destructuring
      const file = val[0];
      //   if (file.type !== 'application/json') {
      //     this.isValid = false;
      //   } else {
      this.isValid = true;
      this.json = await loadKeystore(file);
      // }
    },

    async importKey() {
      const key = await getPrivateKey(this.pwd, this.json);
      console.log('key: ', key);
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

</style>
