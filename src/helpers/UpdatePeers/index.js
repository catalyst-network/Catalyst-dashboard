import axios from 'axios';
import Node from '../../store/Node';
import Peer from '../../store/Peer';
import { bytesToBase32 } from '../../boot/base32';


// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

async function getPeers() {
  const peerApi = await axios.get(`http://${Node.all()[0].ipAddress}:5005/api/Peer/GetAllPeers`);
  console.log(peerApi);
  const peers = peerApi.data.map(peer => ({
    peerId: bytesToBase32(peer.PeerId.PublicKey),
    nodeId: Node.all()[0].peerId,
    address: peer.PeerId.IpAddress,
    created: peer.Created,
    blacklisted: peer.Blacklisted,
    modified: peer.Modified,
    lastSeen: new Date(peer.LastSeen).getTime(),
    isAwolPeer: peer.IsAwolPeer,
    inactiveFor: peer.InactiveFor,
    reputation: peer.Reputation,
  }));
  console.log('peers:', peers);

  return peers;
}
// function setPeersOffline(peers) {
//   peers.forEach((peer) => {
//     Peer.update({
//       where: peer.peerId,
//       data: { lastSeen: 'Offline' },
//     });
//   });
// }

// function insertPeers(peers) {
//   // peers.forEach((peer) => {
//   //   const random = getRandomInt(80, 100);
//   //   peer.reputation = random;
//   // });
//   Peer.insert({ data: peers });
// }

// function updatePeers(peers) {
//   peers.forEach((peer) => {
//     Peer.update({
//       where: peer.peerId,
//       data: peer,
//     });
//   });
// }

function storePeers(peers) {
  // console.log('connected peers: ', peers.length);
  // const storedPeers = Peer.all().map(peer => peer.peerId);
  // const peerIds = peers.map(peer => peer.peerId);

  // if (storedPeers.length > 0) {
  //   const foundPeers = peers.filter(peer => storedPeers.includes(peer.peerId));
  //   const newPeers = peers.filter(peer => !storedPeers.includes(peer.peerId));
  //   const offlinePeers = Peer.all().filter(peer => !peerIds.includes(peer.peerId));
  //   console.log(offlinePeers);

  //   updatePeers(foundPeers);
  //   insertPeers(newPeers);
  //   // setPeersOffline(offlinePeers);
  // } else {
  //   insertPeers(peers);
  // }
  // peers.forEach((peer) => {
  //   Peer.update({
  //     where: peer.peerId,
  //     data: peer,
  //   });
  // });
  Peer.insert({ data: peers });
}

async function refreshPeers() {
  const peers = await getPeers();
  storePeers(peers);
}

export default refreshPeers;
