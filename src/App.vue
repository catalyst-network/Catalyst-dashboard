<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Node from './store/Node';
import Peer from './store/Peer';
import Wallet from './store/Wallet';


export default {
  name: 'App',

  mounted() {
    Node.insert({
      data: {
        status: 'syncing',
        version: '0.12',
        peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
        reputation: 97,
      },
    });

    Wallet.insert({
      data: {
        balance: 565.038494,
        address: '0xbbF5029Fd710d227630c8b7d338051B8E76d50B3',
        nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
      },
    });

    Peer.insert({
      data: [
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci89JWdn672cHXHC8GstD',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'Glasgow, GB-SCT',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '100%',
          reputation: 100,
          lastSeen: 'Online now',
          created: ' 13:01 05/08/19',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci89JWdn672cHXHC8GrhD',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'London, GB',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
          reputation: 60,
          lastSeen: 'Online now',
          created: ' 13:01 05/08/19',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhF',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'New York, US',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
          reputation: 57,
          lastSeen: 'Online now',
          created: ' 13:01 05/08/19',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhE',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'Singapore, SG',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
          reputation: 11,
          lastSeen: 'Online now',
          created: ' 13:01 05/08/19',
          blacklisted: true,
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXXC8GrhD',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'Shanghai, CN',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
          reputation: 82,
          lastSeen: '5 minutes ago',
          created: ' 13:01 05/08/19',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8Prhj',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'Paris, FR',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
          reputation: 100,
          lastSeen: 'Online now',
          created: ' 13:01 05/08/19',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8Drhs',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'Berlin, DE',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
          reputation: 100,
          lastSeen: 'Online now',
          created: ' 13:01 05/08/19',
        },
      ],
    });
  },
};
</script>

<style>
</style>
