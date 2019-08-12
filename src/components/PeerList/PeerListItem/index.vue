<template>
  <div>
    <div
      class="row peer-item text-negative"
      :class="blacklisted"
    >
      <div
        class="peer-id col-4 break"
      >
        <span
          class="peer-id"
          @click="fullDetails=true"
        >{{ peer.peerId }}</span>
      </div>
      <div class="col text-right">
        {{ peer.address }}
      </div>
      <div class="col text-right">
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
    <q-dialog
      v-model="fullDetails"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6 text-primary default-font-bold">
              {{ $t('peerDetails') }}
            </div>
            <div>
              <q-chip
                v-if="peer.isAwolPeer"
                square
                color="orange"
                text-color="white"
                :label="$t('awol')"
              />
              <q-chip
                v-if="peer.blacklisted"
                square
                color="red"
                text-color="white"
                :label="$t('blacklisted')"
              />
            </div>
          </div>
        </q-card-section>

        <div>
          <div class="row peer-item justify-between">
            <div class="col-auto  text-secondary text-uppercase default-font-bold">
              {{ $t('peerId') }}:
            </div>
            <div class="col-auto">
              {{ peer.peerId }}
            </div>
          </div>
          <div class="row peer-item justify-between">
            <div class="col-auto text-secondary text-uppercase default-font-bold">
              {{ $t('ipAddress') }}:
            </div>
            <div class="col-auto">
              {{ peer.address }}
            </div>
          </div>
          <div class="row peer-item justify-between">
            <div class="col-auto text-secondary text-uppercase default-font-bold">
              {{ $t('created') }}:
            </div>
            <div class="col-auto">
              {{ peer.created }}
            </div>
          </div>
          <div class="row peer-item justify-between">
            <div class="col-auto text-secondary text-uppercase default-font-bold">
              {{ $t('modified') }}:
            </div>
            <div class="col-auto">
              {{ peer.modified }}
            </div>
          </div>
          <div class="row peer-item justify-between">
            <div class="col-auto text-secondary text-uppercase default-font-bold">
              {{ $t('reputation') }}:
            </div>
            <div class="col-auto q-gutter-x-md">
              <q-rating
                v-model="detailsRating"
                size="1.5em"
                :max="10"
                readonly
                class="peer-rating"
              />
              {{ peer.reputation }}
            </div>
          </div>
          <div class="row peer-item justify-between">
            <div class="col-auto text-secondary text-uppercase default-font-bold">
              {{ $t('lastSeen') }}:
            </div>
            <div class="col-auto">
              {{ peer.lastSeen }}
              <span
                v-if="online"
                class="dot bg-green"
                style="margin-left:2px"
              />
            </div>
          </div>
        </div>
        <div class="row justify-end">
          <q-card-actions
            align="right"
            class="bg-white text-black justify-end"
          >
            <q-btn
              v-close-popup
              flat
              label="OK"
            />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
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
      detailsRating: Math.round(this.peer.reputation / 10),
      fullDetails: false,
    };
  },
  computed: {
    blacklisted() {
      if (this.peer.blacklisted) {
        return 'text-red';
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

.peer-id :hover {
  color: black;
}

.peer-rating {
  padding-right: 5px;
  padding-bottom: 1px;
}

.flag-icon {
  margin-bottom: -3px;
}
</style>
