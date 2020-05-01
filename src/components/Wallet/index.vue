<template>
  <div>
    <q-card
      flat
      bordered
      class="top-row bg-info"
    >
      <q-card-section>
        <div class="text-h6 default-font-bold text-warning">
          {{ send ? $t('send') : $t('balance') }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <Send @sendTransaction="sendTransaction" />
        <!-- <Balance v-if="wallet" /> -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import Wallet from '../../store/Wallet';
// import LoadKeystore from './LoadKeystore';
// import Balance from './Balance';
import Send from './Send';

export default {
  name: 'Wallet',
  components: {
    // LoadKeystore,
    // Balance,
    Send,
  },
  data() {
    return {
      qrDialog: false,
      qrCodeDataURL: null,
      copied: 'copy',
      walletDialog: false,
      send: true,
    };
  },
  computed: {
    wallet() {
      return Wallet.all()[0];
    },
  },

  mounted() {
    this.qrCode();
  },

  methods: {
    async qrCode(qrAddress = this.wallet.address) {
      const options = {
        width: 300,
        height: 300,
      };
      if (typeof this.wallet.address === 'string') {
        await QRCode.toDataURL(qrAddress, options, (err, url) => {
          if (err) {
            console.error(err);
          } else {
            this.qrCodeDataURL = url;
          }
        });
      }
    },

    displayCopy() {
      this.copied = this.$t('copied');
      setTimeout(() => {
        this.copied = this.$t('copy');
      }, 2000);
    },

    async sendTransaction(tx) {
      console.log(tx);
    },
  },
};
</script>

<style>
.balance {
  margin: 10px 0;
}
</style>
