<template>
  <div class="q-pa-md">
    <div
      v-if="!loading"
      class="column justify-center q-gutter-y-md"
    >
      Dashboard Setup
    </div>
    <q-inner-loading
      dark
      :showing="loading"
    >
      <q-spinner
        size="75px"
        color="secondary"
      />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Setup',
  computed: {
    ...mapState({
      loading: (state => state.Settings.loading),
    }),
  },
};
</script>
<style lang="stylus" scoped>

.q-inner-loading--dark
  background $primary

</style>
