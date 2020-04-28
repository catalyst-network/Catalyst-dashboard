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
        <div
          class="text-left text-negative"
          style="width: 100%"
        >
          Is your node on this computer or a remote server?
        </div>
        <div
          class="row q-mt-md justify-between text-negative"
          style="width: 100%; font-size: 18px;"
        >
          <div
            class="col node-item q-gutter-y-md"
            @click="slide='name'"
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

          <div class="col node-item q-gutter-y-md">
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
      </q-carousel-slide>
      <q-carousel-slide
        name="layers"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="layers"
          size="56px"
        />
        <div class="q-mt-md text-center text-black">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="map"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="terrain"
          size="56px"
        />
        <div class="q-mt-md text-center text-black">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
export default {
  name: 'SetupStepper',
  data() {
    return {
      slide: 'node',
      name: null,
    };
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
</style>
