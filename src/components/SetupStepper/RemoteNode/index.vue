<template>
  <div>
    <div class="q-py-md">
      <div class="row justify-center">
        <div class="slide-icon">
          <q-icon
            name="fas fa-server"
            color="white"
            size="30px"
          />
        </div>
      </div>


      <div class=" text-h6 q-mt-sm text-bold text-negative">
        Add Remote Connection
      </div>
    </div>
    <div
      class="text-center text-negative"
      style="width: 100%"
    >
      Add your remote node connection details
    </div>
    <div
      class="row q-mt-lg justify-between text-negative"
      style="width: 100%; font-size: 18px;"
    >
      <div class="col-12">
        <q-input
          v-model="remote.nodeName"
          autofocus
          dark
          dense
          filled
          color="negative"
          label="name your remote node (eg AWS Catalyst Node)"
        >
          <template v-slot:prepend>
            <q-icon
              name="fas fa-tag"
              color="secondary"
              size="15px"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div
      class="row q-mt-md justify-between text-negative"
      style="width: 100%; font-size: 18px;"
    >
      <div class="col-7">
        <q-input
          v-model="remote.host"
          dark
          dense
          filled
          color="negative"
          label="host (eg 77.68.110.175)"
          class="q-mr-sm"
        >
          <template v-slot:prepend>
            <q-icon
              name="fas fa-server"
              color="secondary"
              size="15px"
            />
          </template>
        </q-input>
      </div>
      <div class="col-5">
        <q-input
          v-model="remote.port"
          dark
          dense
          filled
          label="port (eg 5005)"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon
              name="fab fa-megaport"
              color="secondary"
              size="15px"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div
      class="row q-mt-md justify-between text-negative"
      style="width: 100%; font-size: 18px;"
    >
      <div class="col-12">
        <q-file
          ref="filePicker"
          v-model="remote.keystore"
          dark
          dense
          filled
          color="negative"
          label="add your keystore file (eg key.pem)"
          @input="readKeyfile"
        >
          <template v-slot:prepend>
            <q-icon
              name="fas fa-key"
              color="secondary"
              size="15px"
            />
          </template>
        </q-file>
      </div>
    </div>
    <div
      v-if="showConfirm"
      class="q-mt-md row text-center text-negative justify-center"
      style="width: 100%"
    >
      <q-btn
        ref="confirmButton"
        tab-index="0"
        unelevated
        color="secondary"
        label="OK✓"
        @click="auth=true"
        @keydown.enter.prevent="auth=true"
      />
      <div class="q-pl-sm key-text flex flex-center">
        Press Enter ↵
      </div>
    </div>
    <AuthenticationModal
      :display="auth"
      :keystore="remote.key"
      @authSuccess="authSuccess"
      @authFail="authCancel"
    />
  </div>
</template>
<script>
import AuthenticationModal from '../../AuthenticationModal';

export default {
  name: 'RemoteNode',
  components: { AuthenticationModal },
  data() {
    return {
      remote: {
        nodeName: null,
        host: null,
        port: null,
        keystore: null,
        key: {},
      },
      auth: false,
    };
  },
  computed: {
    showConfirm() {
      return Object.values(this.remote).filter((key) => {
        if (!key) return true;
        return false;
      }).length === 0;
    },
  },

  methods: {
    async readKeyfile() {
      if (this.remote.keystore) {
        const keyJSON = await this.remote.keystore.text();
        this.remote.key = await JSON.parse(keyJSON);
        this.$refs.filePicker.blur();
        if (this.showConfirm) this.authenticate();
      }
    },

    async authenticate() {
      this.auth = true;
    },

    authSuccess(wallet) {
      this.auth = false;
      this.remote.ipAddress = this.remote.host;
      this.$emit('nodeAdded', wallet, this.remote);
    },

    authCancel() {
      this.auth = false;
    },
  },
};
</script>
