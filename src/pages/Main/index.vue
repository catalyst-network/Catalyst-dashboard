<template>
  <div class="q-pa-md">
    <div
      class="column justify-center q-gutter-y-md"
    >
      <div class="col-auto">
        <div class="row items-start q-gutter-md">
          <div class="col-12 col-md-5 col-lg">
            <NodeStatus />
          </div>
          <div class="col-12 col-md-5 col-lg">
            <NetworkStatus />
          </div>
          <div class="col-12 col-md-5 col-lg">
            <Balance />
          </div>
        </div>
      </div>
      <div
        class="col small"
        style="position: relative; height:10vh;"
      >
        <div class="row items-start q-gutter-md">
          <div class="col">
            <div class="column">
              <div class="col default-font-bold">
                Transactions
              </div>
              <line-chart
                :chart-data="chartData"
                :options="options"
              />
            </div>
          </div>
          <div class="col" />
          <div class="col" />
        </div>
      </div>
      <div class="col-auto q-gutter-y-md">
        <div class="col-auto">
          <div class="row">
            <div class="col">
              <Mempool />
            </div>
          </div>
        </div>

        <div class="col-auto">
          <div class="row">
            <div class="col">
              <PeerList />
            </div>
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
import Mempool from '../../components/Mempool';
import LineChart from '../../components/Chart/index.js';

export default {
  components: {
    NodeStatus,
    NetworkStatus,
    Balance,
    PeerList,
    Mempool,
    LineChart,
  },
};
</script>

<style>
 .top-row {
     min-height: 275px;
 }
 .small {
    max-height: 250px;
  }
</style>
