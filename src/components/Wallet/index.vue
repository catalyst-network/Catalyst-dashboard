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
        <Send
          v-if="showSend"
          @sendTransaction="sendTransaction"
        />
        <Balance v-if="showBalance" />
        <TxSuccess v-if="showSent" />
      </q-card-section>
      <q-inner-loading :showing="sending">
        <q-spinner-dots
          color="secondary"
          size="4em"
        />
        sending transaction...
      </q-inner-loading>
    </q-card>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import Wallet from '../../store/Wallet';
// import LoadKeystore from './LoadKeystore';
import Balance from './Balance';
import Send from './Send';
import TxSuccess from './TxSuccess';

export default {
  name: 'Wallet',
  components: {
    // LoadKeystore,
    Balance,
    Send,
    TxSuccess,
  },
  data() {
    return {
      qrDialog: false,
      qrCodeDataURL: null,
      copied: 'copy',
      walletDialog: false,
      send: true,
      sending: false,
      sent: true,
    };
  },
  computed: {
    wallet() {
      return Wallet.all()[0];
    },
    showBalance() {
      return !this.send && !this.sent;
    },
    showSend() {
      return this.send && !this.sent;
    },
    showSent() {
      return this.sent;
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
      this.sending = true;
      console.log(tx);
      // set loading
      const txHash = await this.wallet.sendTx(tx);
      console.log(txHash);
      this.sending = false;
    },
  },
};
</script>

<style>
.balance {
  margin: 10px 0;
}
</style>
<style lang="stylus">
.bg-info .q-inner-loading
  background: $primary;

</style>
