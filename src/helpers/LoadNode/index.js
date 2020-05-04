import Node from '../../store/Node';
import Wallet from '../../store/Wallet';
import Charts from '../../store/Charts';
import { publicKeyToAddress, getBlocks } from '../Common';


export async function loadNode(key, pubKey, ip) {
  const { selectedNode } = Window.$store.state.Settings;

  Node.create({
    data: {
      status: 'online',
      version: '0.12',
      peerId: key,
      publicKey: pubKey,
      ipAddress: ip,
      reputation: 97,
    },
  });
  const node = Node.find(selectedNode);
  const address = publicKeyToAddress(node.publicKey);

  Wallet.create({
    data: {
      address,
      nodeId: node.peerId,
    },
  });
}

export async function isSyncing() {
  const node = Window.$store.state.Settings.selectedNode;
  const { peerId, rpc } = Node.find(node);

  const syncing = await rpc.eth_syncing();
  Node.update({
    where: peerId,
    data: {
      syncing,
    },
  });
}

export async function loadCharts() {
  const node = Window.$store.state.Settings.selectedNode;
  const { peerId, syncing, rpc } = Node.find(node);
  const charts = Charts.all();
  if ((!charts || charts[0]?.nodeId !== peerId) && !syncing) {
    console.log('add charts');
    // const rpc = Node.all()[0] ? Node.all()[0].rpc : null;

    const blockHeight = await rpc.eth_blockNumber();
    Window.$store.dispatch('Network/setLedgerCycles', parseInt(blockHeight, 16));


    let blocks;
    if (blockHeight >= 50) {
      blocks = await getBlocks((blockHeight - 49), blockHeight, rpc);
    } else {
      blocks = await getBlocks(0, blockHeight, rpc);
    }

    const txs = blocks.map(({ transactions }) => transactions.length);
    for (let i = 0; i < (50 - txs.length); i += 1) {
      txs.unshift(0);
    }
    const totalTxs = txs.reduce((a, b) => a + b, 0);
    Window.$store.dispatch('Network/setTotalTxs', totalTxs);

    const deltaTimes = blocks.map(({ timestamp, number }, i) => {
      if (blocks[i + 1]) {
        const time = -(parseInt(timestamp, 16) - parseInt(blocks[i + 1].timestamp, 16));
        return {
          time,
          number,
        };
      }
      return null;
    }).filter(x => x);
    for (let i = 0; i < (50 - deltaTimes.length); i += 1) {
      deltaTimes.unshift({ time: 0, number: 0 });
    }
    const times = deltaTimes.map(({ time }) => time);
    const totalTime = times.reduce((a, b) => a + b, 0);
    const avgTime = totalTime / times.length;
    Window.$store.dispatch('Network/setAvLedgerTime', avgTime);


    const numbers = deltaTimes.map(({ number }) => {
      if (number > 0) { return `Delta ${parseInt(number, 16)}`; }
      return '';
    });

    Charts.create({
      data: [{
        id: 'transactions',
        labels: new Array(50).fill(''),
        nodeId: peerId,
        datasets: [{
          backgroundColor: '#16ac9f',
          data: txs,
        }],
      },
      {
        id: 'ledgerTime',
        labels: numbers,
        nodeId: peerId,
        datasets: [{
          backgroundColor: '#16ac9f',
          data: times,
        }],
      },
      ],
    });

    // Charts.insert({
    //   data: {
    //     id: 'ledgerTime',
    //     labels: new Array(50).fill(''),
    //     datasets: [{
    //       backgroundColor: '#16ac9f',
    //       data: deltaTimes,
    //     }],
    //   },
    // });
  }
}
