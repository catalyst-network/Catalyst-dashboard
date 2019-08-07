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
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci89JWdn672cHXHC8GrhD',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'London, UK',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhF',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'London, UK',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhE',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'London, UK',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXXC8GrhD',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'London, UK',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8Prhj',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'London, UK',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
        },
        {
          peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8Drhs',
          nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
          address: '192.168.0.1',
          location: 'London, UK',
          isValidator: 'yes',
          latency: '55ms',
          uptime: '99.96%',
        },
      ],
    });
  },
};
</script>

<style>
</style>
