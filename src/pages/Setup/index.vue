<template>
  <div class="q-pa-md">
    <div
      v-if="!loading"
      class="column text-center justify-center"
    >
      Dashboard Setup
      <SetupStepper />
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
import SetupStepper from '../../components/SetupStepper';

export default {
  name: 'Setup',
  components: {
    SetupStepper,
  },
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
