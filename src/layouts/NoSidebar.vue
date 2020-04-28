<template>
  <q-layout
    view="hHh LpR fFf"
    class="bg-primary"
  >
    <q-page-container
      class="flex flex-center"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'NoSidebar',
};
</script>
