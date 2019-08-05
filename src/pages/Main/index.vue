<template>
<div class="q-pa-md">


    <div class="column" style="height: 100vh">

      <div class="col-6">
          <div class="row items-start q-gutter-md">
      <div class="col">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 default-font">Node Status</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 default-font">Network Status</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 default-font">Balance</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
      </div>

      <div class="col-6">
          <div class="row">
      <div class="col">

    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6 default-font">Connected Peers</div>
      </q-card-section>

      <q-markup-table
      class="default-font">
        <thead>
          <tr>
            <th class="text-left">Peer ID</th>
            <th class="text-right">Address</th>
            <th class="text-right">Location</th>
            <th class="text-right">Is validator</th>
            <th class="text-right">Latency</th>
            <th class="text-right">Uptime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Frozen Yogurt</td>
            <td class="text-right">159</td>
            <td class="text-right">yes</td>
            <td class="text-right">yes</td>
            <td class="text-right">4 ms</td>
            <td class="text-right">100%</td>
          </tr>
          <tr>
            <td class="text-left">Ice cream sandwich</td>
            <td class="text-right">237</td>
            <td class="text-right">9</td>
            <td class="text-right">yes</td>
            <td class="text-right">4.3 ms</td>
            <td class="text-right">100%</td>
          </tr>
          <tr>
            <td class="text-left">Eclair</td>
            <td class="text-right">262</td>
            <td class="text-right">16</td>
            <td class="text-right">yes</td>
            <td class="text-right">6 ms</td>
            <td class="text-right">100%</td>
          </tr>
          <tr>
            <td class="text-left">Cupcake</td>
            <td class="text-right">305</td>
            <td class="text-right">3.7</td>
            <td class="text-right">yes</td>
            <td class="text-right">4.3 ms</td>
            <td class="text-right">100%</td>
          </tr>
          <tr>
            <td class="text-left">Gingerbread</td>
            <td class="text-right">356</td>
            <td class="text-right">16</td>
            <td class="text-right">yes</td>
            <td class="text-right">3.9 ms</td>
            <td class="text-right">100%</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
