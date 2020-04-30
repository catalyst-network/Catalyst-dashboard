<template>
  <div>
    <div class="q-pa-sm">
      <q-icon
        color="white"
        size="50px"
      >
        🎉
      </q-icon>
    </div>

    <div
      class="q-mt-md text-center text-bold text-negative"
      style="width: 100%"
    >
      Your node has been successfully added to the dashboard!
    </div>
    <div
      class="q-ml-md q-mt-md row justify-center text-center text-negative"
      style="width: 100%"
    >
      <q-btn
        unelevated
        color="secondary"
        label="Go To Dashboard"
        @click="complete"
      />
      <div class="q-pl-sm key-text flex flex-center">
        Press Enter ↵
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Complete',

  created() {
    window.addEventListener('keyup', this.keyListener);
  },

  methods: {
    keyListener(event) {
      if (event.which === 13) this.complete();
    },

    complete() {
      this.$emit('goToDashboard');
    },
  },
};
</script>
