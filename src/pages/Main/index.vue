<template>
  <div class="q-pa-md">
    <div
      class="column justify-around q-gutter-y-md"
      style="height: 100vh"
    >
      <div class="col-auto">
        <div class="row items-start q-gutter-md">
          <div class="col-12 col-md-5 col-lg-auto">
            <NodeStatus />
          </div>
          <div class="col-12 col-md-5 col-lg-auto">
            <NetworkStatus />
          </div>
          <div class="col-12 col-md-5 col-lg-auto">
            <Balance />
          </div>
        </div>
      </div>

      <div class="col-auto">
        <div class="row">
          <div class="col-12">
            <PeerList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NodeStatus from '../../components/NodeStatus';
import NetworkStatus from '../../components/NetworkStatus';
import Balance from '../../components/Balance';
import PeerList from '../../components/PeerList';

export default {
  components: {
    NodeStatus,
    NetworkStatus,
    Balance,
    PeerList,
  },
};
</script>

<style>

</style>
