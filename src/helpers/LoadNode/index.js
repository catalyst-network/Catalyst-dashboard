import Node from '../../store/Node';
import Wallet from '../../store/Wallet';
import Charts from '../../store/Charts';
import { publicKeyToAddress, getBlocks } from '../Common';


export async function loadNode(key, ip) {
  Node.create({
    data: {
      status: 'online',
      version: '0.12',
      peerId: key,
      ipAddress: ip,
      reputation: 97,
    },
  });
  const address = publicKeyToAddress(Node.all()[0].peerId);

  Wallet.create({
    data: {
      address,
      nodeId: Node.all()[0].peerId,
    },
  });
}

export async function isSyncing() {
  const { peerId, rpc } = Node.all()[0];

  const syncing = await rpc.eth_syncing();
  Node.update({
    where: peerId,
    data: {
      syncing,
    },
  });
}

export async function loadCharts() {
  const { peerId, syncing } = Node.all()[0];
  const charts = Charts.all();
  if ((!charts || charts[0]?.nodeId !== peerId) && !syncing) {
    console.log('add charts');
    const rpc = Node.all()[0] ? Node.all()[0].rpc : null;

    const blockHeight = await rpc.eth_blockNumber();


    let blocks;
    if (blockHeight >= 50) {
      blocks = await getBlocks((blockHeight - 49), blockHeight, rpc);
    } else {
      blocks = await getBlocks(0, blockHeight, this.rpc);
    }

    const txs = blocks.map(({ transactions }) => transactions.length);
    for (let i = 0; i < (50 - txs.length); i += 1) {
      txs.unshift(0);
    }

    const deltaTimes = blocks.map(({ timestamp }, i) => {
      if (blocks[i + 1]) {
        return -(parseInt(timestamp, 16) - parseInt(blocks[i + 1].timestamp, 16));
      }
      return null;
    }).filter(Number);
    for (let i = 0; i < (50 - deltaTimes.length); i += 1) {
      deltaTimes.unshift(0);
    }

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
        labels: new Array(50).fill(''),
        nodeId: peerId,
        datasets: [{
          backgroundColor: '#16ac9f',
          data: deltaTimes,
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
