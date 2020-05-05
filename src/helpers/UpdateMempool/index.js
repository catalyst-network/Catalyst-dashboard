/* eslint-disable no-nested-ternary */
// import ERPC from '@etclabscore/ethereum-json-rpc';
import Wallet from '../../store/Wallet';
import Tx from '../../store/Tx';
// import Charts from '../../store/Charts';


// const rpc = new ERPC({
//   transport: {
//     host: process.env.NODE_API,
//     port: 5005,
//     type: 'http',
//     path: '/api/eth/request',
//   },
// });


async function getMempool(rpc) {
  const txApi = await rpc.eth_pendingTransactions();
  const txs = txApi.map(tx => ({
    txHash: tx.hash,
    peerId: tx.from,
    to: tx.to,
    amount: parseInt(tx.value, 16),
    time: Date.now(),
  }));
  console.log('txs:', txs);

  return txs;
}

// function insertTxs(txs) {
//   Tx.insert({ data: txs });
// }

// export function flushMempool(txs) {
//   const txChart = Charts.find('transactions');
//   txChart.datasets[0].data.push(txs.length);
//   txChart.datasets[0].data.shift();
//   Charts.update({
//     where: 'transactions',
//     data: {
//       datasets: [{
//         data: txChart.datasets[0].data,
//         backgroundColor: txChart.datasets[0].backgroundColor,
//       }],
//     },
//   });
//   txs.forEach((tx) => {
//     Tx.delete(tx.txHash);
//   });
// }

function storeMempool(txs) {
  Tx.create({ data: txs });
}

export async function updateBalance(rpc) {
  const { selectedNode } = Window.$store.state.Settings;
  const wallet = Wallet.query().where('nodeId', selectedNode).get()[0];
  const balance = await rpc.eth_getBalance(wallet.address);
  Wallet.update({
    where: wallet.address,
    data: { balance: parseInt(balance, 16) },
  });
}

export async function refreshMempool(rpc) {
  const txs = await getMempool(rpc);
  storeMempool(txs);
}


export default refreshMempool;
