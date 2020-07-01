<template>
  <div>
    <div class="row justify-center">
      <q-avatar
        color="primary"
        text-color="secondary"
        size="60px"
      >
        <img
          src="../../../assets/icon.png"
        >
      </q-avatar>
    </div>
    <div class="row justify-center">
      <h6 class="balance">
        {{ wallet.katBalance }} KAT
      </h6>
    </div>
    <div
      class="row justify-center"
      style="width: 100%"
      @click="walletSend"
    >
      <WalletItem
        :wallet="wallet"
      />
    </div>

    <q-dialog v-model="qrDialog">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ $t('walletAddress') }}
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>
        <q-card-section>
          <div class="qr-code">
            <img
              v-if="qrCodeDataURL"
              :src="qrCodeDataURL"
            >
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import QRCode from 'qrcode';
import Wallet from '../../../store/Wallet';
import WalletItem from '../WalletItem';

export default {
  name: 'Balance',
  components: { WalletItem },

  data() {
    return {
      qrDialog: false,
      qrCodeDataURL: null,
      copied: 'copy address',
      walletDialog: false,
    };
  },
  computed: {
    ...mapState({
      selectedNode: (state => state.Settings.selectedNode),
    }),
    wallet() {
      return Wallet.query().where('nodeId', this.selectedNode).get()[0];
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

    walletSend() {
      this.$emit('showSend');
    },
  },
};
</script>

<style>
.balance {
  margin: 10px 0;
  font-size: 18px;
}
</style>
