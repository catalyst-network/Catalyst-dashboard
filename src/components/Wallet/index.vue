<template>
  <div>
    <q-card
      flat
      bordered
      class="top-row bg-info"
    >
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6 default-font-bold text-warning">
            {{ send ? $t('send') : $t('balance') }}
          </div>
          <q-btn
            v-if="!showBalance"
            flat
            label="X"
            @click="backToBalance"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <Send
          v-if="showSend"
          @sendTransaction="sendTransaction"
        />
        <Balance
          v-if="showBalance"
          @showSend="backToSend"
        />
        <TxSuccess
          v-if="showSent"
          :tx="sentTx"
          @backToBalance="backToBalance"
        />
        <TxFail
          v-if="showFail"
          @backToSend="backToSend"
        />
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
import TxFail from './TxFail';


export default {
  name: 'Wallet',
  components: {
    // LoadKeystore,
    Balance,
    Send,
    TxSuccess,
    TxFail,
  },
  data() {
    return {
      qrDialog: false,
      qrCodeDataURL: null,
      copied: 'copy',
      walletDialog: false,
      send: false,
      sending: false,
      sent: false,
      sentTx: '',
      sentFail: false,
    };
  },
  computed: {
    wallet() {
      return Wallet.all()[0];
    },
    showBalance() {
      return !this.send && !this.sent && !this.sentFail;
    },
    showSend() {
      return this.send && !this.sent && !this.sentFail;
    },
    showSent() {
      return this.sent && !this.sentFail;
    },
    showFail() {
      return this.sentFail;
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

    backToBalance() {
      this.send = false;
      this.sent = false;
      this.sentTx = null;
      this.sentFail = false;
    },

    backToSend() {
      console.log('called');
      this.sent = false;
      this.sentFail = false;
      this.send = true;
    },

    async sendTransaction(tx) {
      this.sending = true;
      console.log(tx);
      // set loading
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const receipt = await this.wallet.sendTx(tx);
        console.log('receipt:', receipt);
        this.sentTx = receipt;
        this.sent = true;
        this.sending = false;
      } catch (e) {
        console.erro(e);
        this.sentFail = true;
        this.sending = false;
      }
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
