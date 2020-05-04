<template>
  <div>
    <div class="q-py-md">
      <div class="row justify-center">
        <div class="slide-icon">
          <q-icon
            name="fas fa-plus-circle"
            color="white"
            size="30px"
          />
        </div>
      </div>


      <div class=" text-h6 q-mt-sm text-bold text-negative">
        Add Node
      </div>
    </div>
    <div
      class="text-center text-negative"
      style="width: 100%"
    >
      Is your node on this computer or a remote server?
    </div>
    <div
      class="row q-mt-xl justify-between text-negative"
      style="width: 100%; font-size: 18px;"
    >
      <div
        tabIndex="1"
        class="col node-item q-gutter-y-md"
        @click="selectLocal"
      >
        <q-icon
          name="fas fa-desktop"
          size="75px"
        />
        <br>
        <div class="row justify-center">
          This Computer
        </div>
        <div class="row justify-center q-pb-md">
          <div class="key-letter text-bold q-mr-sm">
            A
          </div>
        </div>
      </div>

      <div
        tabIndex="2"
        class="col node-item q-gutter-y-md"
        @click="selectRemote"
      >
        <q-icon
          name="fas fa-server"
          size="75px"
        />
        <br>
        <div class="row justify-center">
          Remote Server
        </div>
        <div class="row justify-center">
          <div class="key-letter text-bold q-mr-sm">
            B
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NodeType',
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
