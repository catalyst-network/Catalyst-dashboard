<template>
  <div class="row peer-item">
    <div class="col-4 break">
      {{ peer.peerId }}
    </div>
    <div class="col text-right">
      {{ peer.address }}
    </div>
    <div class="col text-right">
      {{ peer.location }}
    </div>
    <div class="col text-right">
      {{ peer.isValidator }}
    </div>
    <div class="col text-right">
      {{ peer.latency }}
    </div>
    <div class="col text-right">
      {{ peer.uptime }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeerItem',
  props: {
    peer: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>

</style>
