<template>
  <div>
    <q-card
      flat
      bordered
      class="top-row bg-info"
    >
      <q-card-section>
        <div class="text-h6 default-font-bold text-warning">
          {{ $t('balance') }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <q-avatar
            color="primary"
            text-color="secondary"
            size="75px"
          >
            <img
              src="../../assets/icon.png"
            >
          </q-avatar>
        </div>
        <div class="row justify-center">
          <h6 class="balance">
            {{ wallet.katBalance }} KAT
          </h6>
        </div>
        <div class="column justify-center">
          <div class="col-auto text-center ">
            {{ $t('address') }}:
          </div>
          <div class="col-auto text-caption break text-center">
            {{ wallet.address }}
          </div>
          <div class="col-auto text-center">
            <q-btn
              v-clipboard="wallet.address"
              icon="content_copy"
              size="sm"
              flat
              round
              dense
              style="padding-top: 0"
              @click="displayCopy"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
              >
                {{ copied }}
              </q-tooltip>
            </q-btn>

            <q-btn
              icon="fas fa-qrcode"
              size="sm"
              flat
              round
              dense
              style="padding-top: 0"
              @click="qrDialog=true"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
              >
                {{ $t('qrCode') }}
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="fas fa-qrcode"
              size="sm"
              flat
              round
              dense
              style="padding-top: 0"
              @click="walletDialog=true"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

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

    <q-dialog
      v-model="walletDialog"
      class="bg-info"
    >
      <q-card
        class="text-negative bg-info q-pa-lg"
        style="width: 700px; max-width: 80vw;"
      >
        <div class="col-auto text-center">
          <LoadKeystore />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QRCode from 'qrcode';
import Wallet from '../../store/Wallet';
import LoadKeystore from '../Wallet/LoadKeystore';

export default {
  name: 'Balance',
  components: {
    LoadKeystore,
  },
  data() {
    return {
      qrDialog: false,
      qrCodeDataURL: null,
      copied: 'copy',
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
  },
};
</script>

<style>
.balance {
  margin: 10px 0;
}
</style>
