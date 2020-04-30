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
      <!-- <q-item
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
      </q-item> -->
      <q-select
        v-model="model"
        filled
        :options="options"
        label="Network:"
        label-color="white"
        color="secondary"
        options-selected-class="secondary"
        @input="changeNode"
      >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label>
                {{ scope.opt.label }}
              </q-item-label>
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
import { loadNode, isSyncing, loadCharts } from '../../helpers/LoadNode';


export default {
  name: 'Sidebar',

  data() {
    return {
      page: 'main',
      options: [
        {
          label: 'Node 1',
          value: {
            ipAddress: '77.68.110.194',
            publicKey: 'ETHAY56IVYMEFUZEJDCK7HEK5Y7G2B5FRYXL5HMWKA74ORWI7RZQ',
          },
          description: 'Testnet Node 1 (linux)',
        },
        {
          label: 'Node 2',
          value: {
            ipAddress: '77.68.110.195',
            publicKey: 'AOWRYB5LXZVZ3PT4ENCBMQ6FYOKBZWB4I7LRDYKUNCZUBPOWYQEQ',
          },
          description: 'Testnet Node 2 (linux)',
        },
        {
          label: 'Node 3',
          value: {
            ipAddress: '77.68.110.196',
            publicKey: 'F3PXMGUZLIUZV3MK6BKDM4QRO5QV5JVWEUTKVXTQFG35QNZFVOGQ',
          },
          description: 'Testnet Node 3 (linux)',
        },
        {
          label: 'Node 4',
          value: {
            ipAddress: '77.68.110.197',
            publicKey: '3S3VLMIVYOOX7HYUK6ZBPITI5LFVNVP2BTWOUBGP6I3UI5X4NYDQ',
          },
          description: 'Testnet Node 4 (windows)',
        },
        {
          label: 'Node 5',
          value: {
            ipAddress: '77.68.110.49',
            publicKey: 'BVE7BZVVRVQI26VQWGMGKHY6SMB2KZ7J4TE2K3C2HJF4CDAG45GA',
          },
          description: 'Non POA node',
        },
      ],
      model: {
        label: 'Node 1',
        value: {
          ipAddress: '77.68.110.194',
          publicKey: 'ETHAY56IVYMEFUZEJDCK7HEK5Y7G2B5FRYXL5HMWKA74ORWI7RZQ',
        },
        description: 'Testnet Node 1 (linux)',
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
    async changeNode(node) {
      this.$store.dispatch('Settings/setLoading', true);

      await loadNode(node.value.publicKey, node.value.ipAddress);
      await isSyncing();
      await loadCharts();

      this.$store.dispatch('Settings/setLoading', false);
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

.q-field__marginal {
  color: white;
}
.sidebar-nav .q-field__native {
    width: 100%;
    min-width: 0;
    outline: 0 !important;
    color: white
}
</style>
