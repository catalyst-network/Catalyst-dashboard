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
              size="xs"
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
              size="xs"
            />
          </template>
        </q-input>
      </div>
      <div class="col-5">
        <q-input
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
              size="xs"
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
          dark
          dense
          filled
          color="negative"
          label="add your keystore file (eg key.pem)"
        >
          <template v-slot:prepend>
            <q-icon
              name="fas fa-key"
              color="secondary"
              size="xs"
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
        @click="slide='node'"
      />
      <div class="q-pl-sm key-text flex flex-center">
        Press Enter ↵
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RemoteNode',
  data() {
    return {
      remote: {
        nodeName: null,
        host: null,
        port: null,
        keystore: null,
      },
    };
  },
  computed: {
    showConfirm() {
      return Object.entries(this.remote).filter((key) => {
        if (!this.remote[key]) return true;
        return false;
      }).length === 0;
    },
  },

  created() {
    window.addEventListener('keyup', this.keyListener);
  },

  methods: {
    keyListener(event) {
      if (event.which === 65) this.selectLocal();
      if (event.which === 66) this.selectRemote();
    },

    selectLocal() {
      this.$emit('nodeType', 'local');
    },

    selectRemote() {
      this.$emit('nodeType', 'remote');
    },
  },
};
</script>
