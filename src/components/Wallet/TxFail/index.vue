<template>
  <div class="text-center">
    <div class="row q-mt-md justify-center">
      <div>
        <q-icon
          name="far fa-frown"
          size="50px"
        />
      </div>
    </div>
    <div class="row q-mt-sm justify-center">
      something went wrong
    </div>
    <div class="row q-mt-sm justify-center">
      <q-btn
        no-caps
        outline
        size="10px"
        label="Try Again"
        @click="back"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TxFail',
  methods: {
    back() {
      this.$emit('backToSend');
    },
  },
};
</script>
