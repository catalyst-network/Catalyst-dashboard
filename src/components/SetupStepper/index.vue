<template>
  <div>
    <q-carousel
      v-model="slide"
      animated
      control-type="flat"
      control-color="purple"
      navigation="false"
      padding
      arrows
      height="300px"
      class="text-purple rounded-borders"
    >
      <q-carousel-slide
        name="style"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="style"
          size="56px"
        />
        <div class="q-mt-md text-center text-black">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="tv"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="live_tv"
          size="56px"
        />
        <div class="q-mt-md text-center text-black">
          {{ lorem }}
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
      slide: 1,
    };
  },
};
</script>
