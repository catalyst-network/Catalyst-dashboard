<template>
  <div class="wallet-item q-py-sm q-px-sm cursor-pointer">
    <div class="row q-pb-sm justify-between">
      <div class="col text-left text-weight-bold">
        <q-avatar
          color="primary"
          text-color="secondary"
          size="24px"
        >
          <img
            v-if="identicon"
            :src="identicon"
          >
        </q-avatar>
        <span class="q-pl-sm">node account</span>
      </div>
      <div class="col text-right text-secondary text-weight-bold">
        {{ wallet.katBalance }} KAT
      </div>
    </div>
    <q-separator
      class="wallet-separator"
    />
    <div class="row q-pt-sm justify-center">
      {{ wallet.address }}
    </div>
  </div>
</template>
<script>
import blockies from 'blockies-identicon';

export default {
  name: 'WalletItem',
  props: {
    wallet: {
      required: true,
      type: Object,
    },
  },

  computed: {
    identicon() {
      const icon = blockies.create({ seed: 'wallet.address' });
      return icon.toDataURL();
    },
  },
};
</script>
<style lang="scss">
.wallet-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;

  .wallet-separator {
    background: #eeeeee26;
  }
}
</style>
