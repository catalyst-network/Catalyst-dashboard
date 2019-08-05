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
      <p>some info here</p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'NodeStatus',
};
</script>

<style>

</style>
