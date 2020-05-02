<template>
  <div class="text-center">
    <div class="row justify-center">
      <div class="slide-icon">
        <q-icon
          name="fas fa-thumbs-up"
          size="30px"
        />
      </div>
    </div>
    <div class="row q-mt-sm justify-center">
      transaction sent
    </div>
    <div class="row q-mt-sm q-mx-md justify-center break text-secondary">
      0x3fc3cce36387377a1dd4197973c6db651087e88db51b8c7d6c9be1b951990ab5
    </div>
    <div class="row q-mt-sm justify-center">
      <q-btn
        no-caps
        outline
        size="10px"
        label="go back to balance"
        @click="back"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TxSuccess',

  methods: {
    back() {
      this.$emit('backToBalance');
    },
  },
};
</script>
