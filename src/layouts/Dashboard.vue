<template>
  <q-layout
    view="hHh lpR fFf"
    class="bg-accent"
  >
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-primary text-negative"
      class="sidebar"
      :width="205"
    >
      <Sidebar />
    </q-drawer>

    <q-page-container
      class="text-negative"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Sidebar from '../components/Sidebar';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
};
</script>
<style>
.sidebar {
    width: inerit;
}
</style>
