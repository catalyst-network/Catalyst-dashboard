<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Node from './store/Node';
import Peer from './store/Peer';
import Wallet from './store/Wallet';
import Tx from './store/Tx';
// import mockPeerList from './statics/mockPeerList';

export default {
  name: 'App',

  async mounted() {
    Node.insert({
      data: {
        status: 'online',
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

    Tx.insert({
      data: [
        {
          txHash: '0xc57096ec95f964ae0e51a1ec94dd80b2355c59d6860f15fd0293a53328fed18d',
          from: '0x5bfa583eb209bf95abc3d131f40e49433ccea763',
          to: '0xbbF5029Fd710d227630c8b7d338051B8E76d50B3',
          amount: 5,
          time: '22 secs ago',
        },
        {
          txHash: '0xc57096ec95f964ae0e51a1ec94dd80b2355c59d6860f15fd0293a53328fed18e',
          from: '0x5bfa583eb209bf95abc3d131f40e49433ccea763',
          to: '0xbbF5029Fd710d227630c8b7d338051B8E76d50B3',
          amount: 2.3,
          time: '14 secs ago',
        },
      ],
    });
    const peerApi = await this.$axios.get('http://51.91.51.88:5005/api/peer');
    const peers = peerApi.data.map((peer) => {
      const random = this.getRandomInt(0, 100);
      return {
        peerId: peer.PeerIdentifier.PublicKey,
        nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
        reputation: random,
        address: peer.PeerIdentifier.Ip,
        created: peer.Created,
        blacklisted: peer.Blacklisted,
        modified: peer.Modified,
        lastSeen: 'Online now',
        isAwolPeer: peer.IsAwolPeer,
        inactiveFor: peer.InactiveFor,
      };
    });

    Peer.insert({ data: peers });


    // Peer.insert({
    //   data: [
    //     {
    //       peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci89JWdn672cHXHC8GstD',
    //       nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
    //       address: '192.168.0.1',
    //       location: 'Glasgow, GB-SCT',
    //       isValidator: 'yes',
    //       latency: '55ms',
    //       uptime: '100%',
    //       reputation: 100,
    //       modified: '2 days ago',
    //       lastSeen: 'Online now',
    //       created: ' 13:01 05/08/19',
    //       isAwolPeer: false,
    //     },
    //     {
    //       peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci89JWdn672cHXHC8GrhD',
    //       nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
    //       address: '192.168.0.1',
    //       location: 'London, GB',
    //       isValidator: 'yes',
    //       latency: '55ms',
    //       uptime: '99.96%',
    //       reputation: 60,
    //       lastSeen: 'Online now',
    //       created: ' 13:01 05/08/19',
    //       isAwolPeer: false,
    //     },
    //     {
    //       peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhF',
    //       nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
    //       address: '192.168.0.1',
    //       location: 'New York, US',
    //       isValidator: 'yes',
    //       latency: '55ms',
    //       uptime: '99.96%',
    //       reputation: 57,
    //       lastSeen: 'Online now',
    //       created: ' 13:01 05/08/19',
    //       isAwolPeer: false,
    //     },
    //     {
    //       peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhE',
    //       nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
    //       address: '192.168.0.1',
    //       location: 'Singapore, SG',
    //       isValidator: 'yes',
    //       latency: '55ms',
    //       uptime: '99.96%',
    //       reputation: 11,
    //       lastSeen: '34 minutes ago',
    //       created: ' 13:01 05/08/19',
    //       blacklisted: true,
    //       isAwolPeer: true,
    //     },
    //     {
    //       peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXXC8GrhD',
    //       nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
    //       address: '192.168.0.1',
    //       location: 'Shanghai, CN',
    //       isValidator: 'yes',
    //       latency: '55ms',
    //       uptime: '99.96%',
    //       reputation: 82,
    //       lastSeen: '5 minutes ago',
    //       created: ' 13:01 05/08/19',
    //       isAwolPeer: false,
    //     },
    //     {
    //       peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8Prhj',
    //       nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
    //       address: '192.168.0.1',
    //       location: 'Paris, FR',
    //       isValidator: 'yes',
    //       latency: '55ms',
    //       uptime: '99.96%',
    //       reputation: 100,
    //       lastSeen: 'Online now',
    //       created: ' 13:01 05/08/19',
    //       isAwolPeer: false,
    //     },
    //     {
    //       peerId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8Drhs',
    //       nodeId: 'QmeWvqHeabJWV7a5zVT9GRpszci79JWdn672cHXHC8GrhD',
    //       address: '192.168.0.1',
    //       location: 'Berlin, DE',
    //       isValidator: 'yes',
    //       latency: '55ms',
    //       uptime: '99.96%',
    //       reputation: 100,
    //       lastSeen: 'Online now',
    //       created: ' 13:01 05/08/19',
    //       isAwolPeer: false,
    //     },
    //   ],
    // });
  },

  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
};
</script>

<style>
</style>
