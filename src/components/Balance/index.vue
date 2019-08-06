<template>
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <div class="text-h6 default-font-bold text-primary">
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
          {{ balance }}
        </h6>
      </div>
      <div class="column justify-center">
        <div class="col-auto text-center ">
          {{ $t('address') }}:
        </div>
        <div class="col-auto text-caption break text-center">
          {{ address }}
        </div>
        <div class="col-auto text-center">
          <q-btn
            v-clipboard="address"
            icon="content_copy"
            size="sm"
            flat
            round
            dense
            style="padding-top=0"
          />
          <q-btn
            icon="fas fa-qrcode"
            size="sm"
            flat
            round
            dense
            style="padding-top=0"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'Balance',
  data() {
    return {
      address: '0xbbF5029Fd710d227630c8b7d338051B8E76d50B3',
      balance: '565.038494 KAT',
    };
  },
};
</script>

<style>
.balance {
  margin: 10px 0;
}
</style>
