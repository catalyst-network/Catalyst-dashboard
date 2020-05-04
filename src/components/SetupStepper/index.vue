<template>
  <div>
    <q-carousel
      v-model="slide"
      animated
      :arrows="showBackButton"
      control-type="flat"
      control-color="secondary"
      padding
      class="text-secondary setup-stepper rounded-borders"
    >
      <q-carousel-slide
        name="entry"
        class="column no-wrap flex-center"
      >
        <!-- <q-icon
          name="style"
          size="56px"
        /> -->
        <div
          class=" text-h3 text-weight-bold text-center text-negative"
          style="width: 100%"
        >
          Catalyst Dashboard
        </div>
        <!-- <div class="text-h6 text-negative q-mt-md text-center">
          Let's setup your node
        </div> -->
        <div
          class="q-pt-lg column justify-center text-negative"
          style="width: 100%"
        >
          <div class="row justify-center">
            <q-btn
              unelevated
              color="secondary"
              label="Get Started"
              @click="slide='name'"
              @keydown.enter.prevent="slide='name'"
            />
          </div>
          <div class="row justify-center q-mt-md">
            <div class="q-pl-sm key-text flex flex-center">
              Press Enter ↵
            </div>
          </div>
        </div>
      </q-carousel-slide>
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
            @keydown.enter.prevent=" nodeName ? addLocalNode() : null"
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
            @click="addLocalNode"
          />
          <div class="q-pl-sm key-text flex flex-center">
            Press Enter ↵
          </div>
        </div>
        <AuthenticationModal
          :display="auth"
          :keystore="keystore"
          @authSuccess="localSuccess"
          @authFail="() => auth = false"
        />
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
import AuthenticationModal from '../AuthenticationModal';

import User from '../../store/User';
import Node from '../../store/Node';
import Wallet from '../../store/Wallet';

export default {
  name: 'SetupStepper',
  components: {
    NodeType, RemoteNode, Complete, AuthenticationModal,
  },
  data() {
    return {
      slide: 'entry',
      name: null,
      nodeName: null,
      key: {},
      keystore: {},
      auth: false,
    };
  },

  computed: {
    showBackButton() {
      if (this.slide === 'node') return true;
      if (this.slide === 'remoteNode') return true;
      return false;
    },
  },

  created() {
    window.addEventListener('keyup', this.keyListener);
  },


  methods: {
    keyListener(event) {
      if (this.slide === 'entry') {
        if (event.which === 13) this.slide = 'name';
      }
    },

    selectNodeType(value) {
      if (value === 'local') this.slide = 'nodeName';
      else this.slide = 'remoteNode';
    },

    async addLocalNode() {
      this.keystore = Node.getLocalKeystore();
      this.auth = true;
    },

    async localSuccess(wallet) {
      const { BindAddress } = (Node.getConfig()).CatalystNodeConfiguration.Peer;
      const { PublicIpAddress } = (Node.getConfig()).CatalystNodeConfiguration.Peer;
      const node = {
        name: this.nodeName,
        host: BindAddress,
        ipAddress: PublicIpAddress,
        port: 5005,
        key: {
          Id: this.keystore.Id,
        },
      };
      await this.nodeSuccess(wallet, node);
      this.auth = false;
    },

    async nodeSuccess(wallet, node) {
      const user = await User.createUser(this.name);
      await Node.createNode(node, user, wallet);
      await Wallet.createWallet(wallet, node.key.Id, user);
      this.$store.dispatch('Settings/setSelectedNode', node.key.Id);
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
.setup-stepper {
  .q-carousel__prev-arrow--horizontal {
    align-items: start;
  }

  .q-carousel__next-arrow--horizontal {
    display: none;
  }
}
</style>
