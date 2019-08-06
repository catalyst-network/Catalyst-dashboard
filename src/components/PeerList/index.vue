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
          <th class="text-left text-uppercase text-secondary default-font-bold">
            {{ $t('peerId') }}
          </th>
          <th class="text-right text-uppercase text-secondary default-font-bold">
            {{ $t('address') }}
          </th>
          <th class="text-right text-uppercase text-secondary default-font-bold">
            {{ $t('location') }}
          </th>
          <th class="text-right text-uppercase text-secondary default-font-bold">
            {{ $t('isValidator') }}
          </th>
          <th class="text-right text-uppercase text-secondary default-font-bold">
            {{ $t('latency') }}
          </th>
          <th class="text-right text-uppercase text-secondary default-font-bold">
            {{ $t('uptime') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD
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
            QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD
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
            QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD
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
            QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD
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
            QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD
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
.q-table th {
  opacity: 1;
}
</style>
