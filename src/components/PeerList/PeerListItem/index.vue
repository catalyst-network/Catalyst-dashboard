<template>
  <div>
    <div
      class="row peer-item text-negative"
      :class="blacklisted"
    >
      <div
        class="peer-id col-4 overflow"
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
          :src="location.flag"
        >
        <q-tooltip
          v-if="location.city"
          anchor="top right"
          self="bottom left"
        >
          {{ location.city }}, {{ location.country_code }}
        </q-tooltip>
        <q-tooltip
          v-else-if="location.country_code"
          anchor="top right"
          self="bottom left"
        >
          {{ location.country }}
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
        {{ new Date(peer.created).toDateString() }}
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
        <span
          v-if="!online"
          class="dot bg-red"
          style="margin-left:2px"
        />
      </div>
    </div>
    <q-dialog
      v-model="fullDetails"
      class="bg-info"
    >
      <q-card
        class="text-negative bg-info"
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6 text-warning default-font-bold">
              {{ $t('peerDetails') }}
            </div>
            <div>
              <q-chip
                v-if="!online"
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

        <div
          class="text-negative"
        >
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
              {{ new Date(peer.created) }}
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
              <span
                v-if="!online"
                class="dot bg-red"
                style="margin-left:2px"
              />
            </div>
          </div>
        </div>
        <div class="row justify-end">
          <q-card-actions
            align="right"
            class="bg-info text-negative justify-end"
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
      location: {
        city: '',
        country: '',
        country_code: '',
        flag: '',
      },
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
    // flag() {
    //   if (this.location === 'Glasgow, GB-SCT') {
    //     return `../../statics/flag-icons/
    // ${this.peer.location.substring(this.peer.location.length - 6)
    // .toLowerCase()}.svg`;
    //   }
    //   if (this.location) {
    //     return `../../statics/flag-icons/
    // ${this.peer.location.substring(this.peer.location.length - 2)
    // .toLowerCase()}.svg`;
    //   }
    //   return null;
    // },
  },

  async mounted() {
    await this.getLocation();
  },

  methods: {
    async getLocation() {
      const query = await this.$axios.get(`http://api.ipstack.com/${this.peer.address}?access_key=${process.env.IP_API_KEY}`);
      const loc = query.data;
      if (loc.country_code) {
        this.location = {
          city: loc.city,
          country: loc.country_name,
          country_code: loc.country_code,
          flag: `./statics/flag-icons/${loc.country_code.toLowerCase()}.svg`,
        };
      }
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
  opacity: 0.8;
}

.peer-item :hover {
  opacity: 1;
}

.peer-rating {
  padding-right: 5px;
  padding-bottom: 1px;
}

.flag-icon {
  margin-bottom: -3px;
}
</style>
