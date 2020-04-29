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
        unelevated
        color="secondary"
        label="OK✓"
        @click="auth=true"
      />
      <div class="q-pl-sm key-text flex flex-center">
        Press Enter ↵
      </div>
    </div>
    <AuthenticationModal
      :display="auth"
      :keystore="remote.keystore"
      @authSuccess="authSuccess"
      @authFail="authFail"
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
      //   keystore: {
      //     Name: 'self',
      //     Id: '12D3KooWH242bviubcv3HCmZGCF2PNuJfVRL4vrMs1FKKBaHhETG',
      //     Pem: ` -----BEGIN ENCRYPTED PRIVATE KEY-----
      // MIHDMF8GCSqGSIb3DQEFDTBSMDEGCSqGSIb3DQEFDDAkBBChnsxjyrP9HINy9/h8
      // gpOUAgInEDAMBggqhkiG9w0CCwUAMB0GCWCGSAFlAwQBKgQQfTMISwFnpba5AwI6
      // NEbGdARg3/4/yHuJhLr3YATj/2k4q/U73he+JboNfy0GkDa95U16sTobep/mN9Oa
      // ewjTvZS6B6f+BBjq02ZdqvNZ7z9tLrDHHzf6/wm1BOFautq5M0qUyBH6AO+FQO6c
      // ujyPf5/T
      // -----END ENCRYPTED PRIVATE KEY-----`,
      //   },
      },
      auth: false,
    };
  },
  computed: {
    showConfirm() {
      return Object.values(this.remote).filter((key) => {
        console.log(key);
        if (!key) return true;
        return false;
      }).length === 0;
    },
  },

  async mounted() {
    // const keyFile = {
    //   Name: 'self',
    //   Id: '12D3KooWH242bviubcv3HCmZGCF2PNuJfVRL4vrMs1FKKBaHhETG',
    //   Pem: ` -----BEGIN ENCRYPTED PRIVATE KEY-----
    //   MIHDMF8GCSqGSIb3DQEFDTBSMDEGCSqGSIb3DQEFDDAkBBChnsxjyrP9HINy9/h8
    //   gpOUAgInEDAMBggqhkiG9w0CCwUAMB0GCWCGSAFlAwQBKgQQfTMISwFnpba5AwI6
    //   NEbGdARg3/4/yHuJhLr3YATj/2k4q/U73he+JboNfy0GkDa95U16sTobep/mN9Oa
    //   ewjTvZS6B6f+BBjq02ZdqvNZ7z9tLrDHHzf6/wm1BOFautq5M0qUyBH6AO+FQO6c
    //   ujyPf5/T
    //   -----END ENCRYPTED PRIVATE KEY-----`,
    // };

    // const Keystore = await loadKeystoreLib();
    // console.log(Keystore);
    // const keystore = new Keystore(keyFile, 'test');
    // console.log(keystore);
  },

  methods: {
    async readKeyfile() {
      const key = await this.remote.keystore.text();
      console.log(key);
    },

    authSuccess(wallet) {
      this.auth = false;
      console.log(wallet);
    },

    authFail() {
      this.$emit('nodeType', 'remote');
    },
  },
};
</script>
