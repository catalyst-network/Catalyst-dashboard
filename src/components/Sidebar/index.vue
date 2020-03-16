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
        disabled
      >
        <q-item-section avatar>
          <q-icon name="group_work" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('peers') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        disabled
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('settings') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-select
        v-model="options[0]"
        filled
        :options="options"
        label="Node:"
        color="teal"
        options-selected-class="primary"
        @input="changeNode"
      >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption>
                {{ scope.opt.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-list>
    <div class="row justify-center dark-mode">
      <q-toggle
        v-model="setMode"
        color="white"
        icon="fas fa-sun"
      />
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar';
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',

  data() {
    return {
      page: 'main',
      options: [
        {
          label: 'Node 1',
          value: 'Google',
          description: 'Testnet Node 1 (linux)',
        },
        {
          label: 'Node 2',
          value: 'Facebook',
          description: 'Testnet Node 2 (linux)',
        },
        {
          label: 'Node 3',
          value: 'Twitter',
          description: 'Testnet Node 3 (linux)',
        },
        {
          label: 'Node 4',
          value: 'Apple',
          description: 'Testnet Node 4 (windows)',
        },
        {
          label: 'Node 5',
          value: 'Oracle',
          disable: true,
          description: 'Non POA node',
        },
      ],
      model: {
        label: 'Node 1',
        value: 'Google',
        description: 'Testnet Node 1 (linux)',
        icon: 'mail',
      },
    };
  },

  computed: {
    ...mapState({
      darkMode: state => state.Settings.darkMode,
    }),
    setMode: {
      get() {
        return !this.darkMode;
      },
      set(value) {
        if (!value) {
          this.setDarkMode();
          this.$store.dispatch('Settings/setDarkMode', true);
        }
        if (value) {
          this.setLightMode();
          this.$store.dispatch('Settings/setDarkMode', false);
        }
      },
    },
  },

  mounted() {
    if (this.darkMode) {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
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
    changeNode(node) {
      console.log('node: ', node);
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
