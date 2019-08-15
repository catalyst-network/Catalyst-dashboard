import axios from 'axios';
import Node from '../../store/Node';
import Peer from '../../store/Peer';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function getPeers() {
  const peerApi = await axios.get(`${process.env.NODE_API}/api/Peer/GetAllPeers`);
  const peers = peerApi.data.map(peer => ({
    peerId: peer.PeerIdentifier.PublicKey,
    nodeId: Node.all()[0].peerId,
    address: peer.PeerIdentifier.Ip,
    created: peer.Created,
    blacklisted: peer.Blacklisted,
    modified: peer.Modified,
    lastSeen: 'Online now',
    isAwolPeer: peer.IsAwolPeer,
    inactiveFor: peer.InactiveFor,
  }));

  return peers;
}
function setPeersOffline(peers) {
  peers.forEach((peer) => {
    Peer.update({
      where: peer.peerId,
      data: { lastSeen: 'Offline' },
    });
  });
}

function insertPeers(peers) {
  peers.forEach((peer) => {
    const random = getRandomInt(80, 100);
    peer.reputation = random;
  });
  Peer.insert({ data: peers });
}

function updatePeers(peers) {
  peers.forEach((peer) => {
    Peer.update({
      where: peer.peerId,
      data: peer,
    });
  });
}

function storePeers(peers) {
  console.log('connected peers: ', peers.length);
  const storedPeers = Peer.all().map(peer => peer.peerId);
  const peerIds = peers.map(peer => peer.peerId);

  if (storedPeers.length > 0) {
    const foundPeers = peers.filter(peer => storedPeers.includes(peer.peerId));
    const newPeers = peers.filter(peer => !storedPeers.includes(peer.peerId));
    const offlinePeers = Peer.all().filter(peer => !peerIds.includes(peer.peerId));
    updatePeers(foundPeers);
    insertPeers(newPeers);
    setPeersOffline(offlinePeers);
  } else {
    insertPeers(peers);
  }
}

async function refreshPeers() {
  const peers = await getPeers();
  storePeers(peers);
}

export default refreshPeers;
