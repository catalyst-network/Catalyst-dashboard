<template>
  <div
    class="row peer-item"
    :class="blacklisted"
  >
    <div
      class="col-4 break"
    >
      {{ peer.peerId }}
    </div>
    <div class="col text-right">
      {{ peer.address }}
    </div>
    <div class="col text-right">
      <!-- {{ peer.location.slice(0, (peer.location.length - 4)) }} -->
      <img
        width="20px"
        class="flag-icon"
        :src="flag"
      >
      <q-tooltip
        anchor="top right"
        self="bottom left"
      >
        {{ peer.location }}
      </q-tooltip>
    </div>
    <div class="col text-right">
      <q-rating
        v-model="rating"
        size="1em"
        color="secondary"
        readonly
      />
      <q-tooltip
        anchor="top right"
        self="bottom left"
      >
        {{ peer.reputation }} / 100
      </q-tooltip>
    </div>
    <div class="col text-right">
      {{ peer.created }}
    </div>
    <div
      class="col text-right"
    >
      {{ peer.lastSeen }}
      <span
        v-if="online"
        class="dot bg-green"
        style="margin-left:2px"
      />
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
  data() {
    return {
      rating: (Math.round(this.peer.reputation / 10) / 2),
    };
  },
  computed: {
    blacklisted() {
      if (this.peer.blacklisted) {
        return 'blacklisted';
      }
      return '';
    },
    online() {
      return this.peer.lastSeen === 'Online now';
    },
    flag() {
      if (this.peer.location === 'Glasgow, GB-SCT') {
        return `../../statics/flag-icons/${this.peer.location.substring(this.peer.location.length - 6).toLowerCase()}.svg`;
      }
      if (this.peer.location) {
        return `../../statics/flag-icons/${this.peer.location.substring(this.peer.location.length - 2).toLowerCase()}.svg`;
      }
      return null;
    },
  },
};
</script>

<style>
.blacklisted {
    background-color: #ffcdd2;
}
.peer-item {
    padding: 16px;
}
.flag-icon {
    margin-bottom: -3px;
}
</style>
