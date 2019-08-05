<template>
  <q-card
    flat
    bordered
    class="my-card"
  >
    <q-card-section>
      <div class="text-h6 default-font-bold text-primary">
        {{ $t('connectedPeers') }}
      </div>
    </q-card-section>

    <q-markup-table
      class="default-font"
    >
      <thead>
        <tr>
          <th class="text-left">
            {{ $t('peerId') }}
          </th>
          <th class="text-right">
            {{ $t('address') }}
          </th>
          <th class="text-right">
            {{ $t('location') }}
          </th>
          <th class="text-right">
            {{ $t('isValidator') }}
          </th>
          <th class="text-right">
            {{ $t('latency') }}
          </th>
          <th class="text-right">
            {{ $t('uptime') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            Frozen Yogurt
          </td>
          <td class="text-right">
            159
          </td>
          <td class="text-right">
            yes
          </td>
          <td class="text-right">
            yes
          </td>
          <td class="text-right">
            4 ms
          </td>
          <td class="text-right">
            100%
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Ice cream sandwich
          </td>
          <td class="text-right">
            237
          </td>
          <td class="text-right">
            9
          </td>
          <td class="text-right">
            yes
          </td>
          <td class="text-right">
            4.3 ms
          </td>
          <td class="text-right">
            100%
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Eclair
          </td>
          <td class="text-right">
            262
          </td>
          <td class="text-right">
            16
          </td>
          <td class="text-right">
            yes
          </td>
          <td class="text-right">
            6 ms
          </td>
          <td class="text-right">
            100%
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Cupcake
          </td>
          <td class="text-right">
            305
          </td>
          <td class="text-right">
            3.7
          </td>
          <td class="text-right">
            yes
          </td>
          <td class="text-right">
            4.3 ms
          </td>
          <td class="text-right">
            100%
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Gingerbread
          </td>
          <td class="text-right">
            356
          </td>
          <td class="text-right">
            16
          </td>
          <td class="text-right">
            yes
          </td>
          <td class="text-right">
            3.9 ms
          </td>
          <td class="text-right">
            100%
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-card>
</template>

<script>
export default {
  name: 'PeerList',
};
</script>

<style>

</style>
