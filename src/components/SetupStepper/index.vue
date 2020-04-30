<template>
  <div>
    <q-carousel
      v-model="slide"
      animated
      control-type="flat"
      control-color="secondary"
      padding
      class="text-secondary rounded-borders"
    >
      <q-carousel-slide
        name="name"
        class="column no-wrap flex-center"
      >
        <!-- <q-icon
          name="style"
          size="56px"
        /> -->
        <div
          class="text-left text-negative"
          style="width: 100%"
        >
          What's your name?
        </div>
        <div>
          <q-input
            v-model="name"
            dark
            autofocus
            navigation
            placeholder="Type your answer here..."
            color="primary"
            text-color="negative"
            input-style="min-width: 400px; font-size:26px;"
            @keydown.enter.prevent=" name ? slide='node' : null"
          />
        </div>
        <div
          v-if="name"
          class="q-mt-xl q-pt-lg q-ml-md row text-left text-negative absolute"
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
      </q-carousel-slide>
      <q-carousel-slide
        name="node"
        e
        class="column no-wrap flex-center"
      >
        <NodeType @nodeType="selectNodeType" />
      </q-carousel-slide>
      <q-carousel-slide
        name="remoteNode"
        class="column no-wrap flex-center"
      >
        <RemoteNode @nodeAdded="nodeSuccess" />
      </q-carousel-slide>
      <q-carousel-slide
        name="nodeName"
        class="column no-wrap flex-center"
      >
        <!-- <q-icon
          name="style"
          size="56px"
        /> -->
        <div
          class="text-left text-negative"
          style="width: 100%"
        >
          Let's give your node a name
        </div>
        <div>
          <q-input
            v-model="nodeName"
            dark
            autofocus
            navigation
            placeholder="Type a name for your node here..."
            color="primary"
            text-color="negative"
            input-style="min-width: 400px; font-size:24px;"
            @keydown.enter.prevent=" nodeName ? slide='node' : null"
          />
        </div>
        <div
          v-if="nodeName"
          class="q-mt-xl q-pt-lg q-ml-md row text-left text-negative absolute"
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
      </q-carousel-slide>
      <q-carousel-slide
        name="success"
        class="column no-wrap flex-center"
      >
        <Complete @goToDashboard="goToDashboard" />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import NodeType from './NodeType';
import RemoteNode from './RemoteNode';
import Complete from './Complete';
import {
  createUser, createNode, createWallet,
} from '../../helpers/AddNode';


export default {
  name: 'SetupStepper',
  components: { NodeType, RemoteNode, Complete },
  data() {
    return {
      slide: 'name',
      name: null,
      nodeName: null,
    };
  },

  methods: {
    selectNodeType(value) {
      if (value === 'local') this.slide = 'nodeName';
      else this.slide = 'remoteNode';
    },

    async nodeSuccess(wallet, node) {
      const user = await createUser(this.name);
      await createNode(node, user);
      await createWallet(wallet, node.keystore.Id, user);
      this.slide = 'success';
    },

    goToDashboard() {
      console.log('called');
      this.$router.push({ path: '/' });
    },
  },
};
</script>
<style lang="scss">
.q-carousel {
  background: none;
}

.q-field--standard .q-field__control:before {
  border-bottom: none;
}

.key-text {
  font-size: 12px;
}

.key-letter {
  border: 2px solid;
  font-size: 12px;
  width: fit-content;
  border-radius: 3px;
  padding: 0px 5px;
}

.node-item:hover {
  background:#ffffffb3;
  color: #0A2D3E;
  border-radius: 5px;
}

.slide-icon {
  border-radius: 50px;
  border: 4px solid;
  width: fit-content;
  padding: 15px;
}
</style>
