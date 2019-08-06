<template>
  <q-card
    flat
    bordered
    class="my-card"
  >
    <q-card-section>
      <div class="text-h6 default-font-bold text-primary">
        {{ $t('nodeStatus') }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-y-md">
        <div class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('status') }}:
          </div>
          <div class="col text-right text-caption">
            <span class="dot bg-yellow" />
            {{ node.status }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-2 text-secondary default-font-bold text-uppercase">
            {{ $t('peerId') }}:
          </div>
          <div class="col break text-right text-caption">
            {{ node.peerId }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col text-secondary default-font-bold text-uppercase">
            {{ $t('version') }}:
          </div>
          <div class="col text-right text-caption">
            {{ node.version }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'NodeStatus',
  data() {
    return {
      node: {
        status: 'Syncing',
        peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
        version: '0.12',
      },
    };
  },
};
</script>

<style>
.break {
  word-break: break-all;
}
.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
</style>
