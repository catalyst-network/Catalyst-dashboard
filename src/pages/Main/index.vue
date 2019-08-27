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
        class="col"
      >
        <div class="row items-start q-gutter-md">
          <div class="col">
            <div class="column q-gutter-sm">
              <div
                class="col default-font-bold"
                style="padding:0 1rem;"
              >
                Transactions
              </div>
              <div>
                <bar-chart
                  :chart-data="txChartData"
                  style="height:150px; padding:0 1rem;"
                />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="column q-gutter-sm">
              <div
                class="col default-font-bold"
                style="padding:0 1rem;"
              >
                Ledger Time
              </div>
              <div>
                <bar-chart
                  :chart-data="ledgerTimeChartData"
                  style="height:150px; padding:0 1rem;"
                />
              </div>
            </div>
          </div>
          <!-- <div class="col">
            <div class="column q-gutter-sm">
              <div class="col default-font-bold">
                Transactions
              </div>
              <div>
                <line-chart
                  :chart-data="txChartData"
                  style="height:150px"
                />
              </div>
            </div>
          </div> -->
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
import BarChart from '../../components/Chart/index.js';
// import LineChart from '../../components/Chart/LineChart';
import Charts from '../../store/Charts';

export default {
  components: {
    NodeStatus,
    NetworkStatus,
    Balance,
    PeerList,
    Mempool,
    BarChart,
    // LineChart,
  },
  computed: {
    txChartData() {
      return Charts.find('transactions');
    },
    ledgerTimeChartData() {
      return Charts.find('ledgerTime');
    },
  },
};
</script>

<style>
 .top-row {
     min-height: 275px;
 }
</style>
