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
        :active="page === 'main'"
        active-class="active-tab"
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
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('settings') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="row justify-center dark-mode">
      <q-toggle
        v-model="setMode"
        color="white"
      />
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar';

export default {
  name: 'Sidebar',

  data() {
    return {
      page: 'main',
      darkMode: true,
    };
  },

  computed: {
    setMode: {
      get() {
        return this.darkMode;
      },
      set(value) {
        if (value) {
          this.setDarkMode();
          this.darkMode = true;
        }
        if (!value) {
          this.setLightMode();
          this.darkMode = false;
        }
      },
    },
  },

  methods: {
    setDarkMode() {
      colors.setBrand('primary', '#0a2d3e');
      colors.setBrand('accent', '#19445b');
      colors.setBrand('negative', '#eee');
      colors.setBrand('info', '#0a2d3e');
      colors.setBrand('warning', '#eee');
    },
    setLightMode() {
      colors.setBrand('primary', '#19445b');
      colors.setBrand('accent', '#f6f7f9');
      colors.setBrand('negative', '#000000');
      colors.setBrand('info', '#ffffff');
      colors.setBrand('warning', '#19445b');
    },
  },
};
</script>

<style>
.logo {
    padding: 1rem;
}

.sidebar-nav {
    margin-top: 1rem;
}

.active-tab {
    background-color: #133446;
    color: white;
}

.dark-mode {
    margin-top: 3rem;
}
</style>
