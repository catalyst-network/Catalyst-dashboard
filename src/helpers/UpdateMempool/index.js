/* eslint-disable no-nested-ternary */
import ERPC from '@etclabscore/ethereum-json-rpc';
import Wallet from '../../store/Wallet';
import Tx from '../../store/Tx';
// import Charts from '../../store/Charts';


const rpc = new ERPC({
  transport: {
    host: process.env.NODE_API,
    port: 5005,
    type: 'http',
    path: '/api/eth/request',
  },
});


async function getMempool() {
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
  // console.log('mempool size: ', txs.length);
  // const storedTxs = Tx.all().map(tx => tx.txHash);
  // const txIds = txs.map(tx => tx.txHash);

  // if (storedTxs.length > 0) {
  //   const newTxs = txs.filter(tx => !storedTxs.includes(tx.txHash));
  //   const oldTxs = Tx.all().filter(tx => !txIds.includes(tx.txHash));
  //   insertTxs(newTxs);
  //   flushMempool(oldTxs);
  // }
  // insertTxs(txs);

  Tx.create({ data: txs });
}

export async function updateBalance() {
  const { address } = Wallet.all()[0];
  const balance = await rpc.eth_getBalance(address);
  Wallet.update({
    where: address,
    data: { balance: parseInt(balance, 16) },
  });
}

export async function refreshMempool() {
  const txs = await getMempool();
  storeMempool(txs);
}


export default refreshMempool;
