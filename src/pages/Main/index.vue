<template>
  <div class="q-pa-md">
    <div
      class="column justify-center"
      style="height: 100vh"
    >
      <div class="col-6">
        <div class="row items-start q-gutter-md">
          <div class="col">
            <NodeStatus />
          </div>
          <div class="col">
            <NetworkStatus />
          </div>
          <div class="col">
            <Balance />
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="row">
          <div class="col">
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
