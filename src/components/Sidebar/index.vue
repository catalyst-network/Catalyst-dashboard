<template>
  <div>
    <q-toolbar-title
      class="default-font"
    >
      <img
        class="logo"
        src="../../assets/logo.svg"
      >
    </q-toolbar-title>
    <q-separator
      color="secondary"
      inset
    />
    <q-list
      dark
      class="sidebar-nav default-font"
    >
      <q-item
        clickable
        tag="a"
        target="_blank"
        rel="noopener"
        href="http://quasar.dev"
      >
        <q-item-section avatar>
          <q-icon name="dashboard" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('dashboard') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        tag="a"
        target="_blank"
        rel="noopener"
        href="https://github.quasar.dev"
      >
        <q-item-section avatar>
          <q-icon name="group_work" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('peers') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        tag="a"
        target="_blank"
        rel="noopener"
        href="http://chat.quasar.dev"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('settings') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style>
.logo {
    padding: 1rem;
}

.sidebar-nav {
    margin-top: 1rem;
}
</style>
