<template>
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <div class="text-h6 default-font-bold text-primary">
        {{ $t('networkStatus') }}
      </div>
      <p>some info here</p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'NetworkStatus',
};
</script>

<style>

</style>
