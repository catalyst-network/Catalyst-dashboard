import axios from 'axios';
import Wallet from '../../store/Wallet';
import Tx from '../../store/Tx';


async function getMempool() {
  const txApi = await axios.get(`${process.env.NODE_API}/api/Mempool/GetMempool`);
  const txs = txApi.data.map(tx => ({
    txHash: tx.id,
    peerId: tx.Transaction.STEntries[0].PubKey,
    amount: tx.Transaction.STEntries[0].Amount,
    time: Date.now(),
  }));

  return txs;
}

function insertTxs(txs) {
  Tx.insert({ data: txs });
}

export function flushMempool(txs) {
  txs.forEach((tx) => {
    Tx.delete(tx.txHash);
  });
}

function storeMempool(txs) {
  console.log('mempool size: ', txs.length);
  const storedTxs = Tx.all().map(tx => tx.txHash);
  const txIds = txs.map(tx => tx.txHash);

  if (storedTxs.length > 0) {
    const newTxs = txs.filter(tx => !storedTxs.includes(tx.txHash));
    const oldTxs = Tx.all().filter(tx => !txIds.includes(tx.txHash));
    insertTxs(newTxs);
    flushMempool(oldTxs);
  } else {
    insertTxs(txs);
  }
}

export async function updateBalance() {
  const balance = await axios.get(`${process.env.NODE_API}/api/Mempool/GetBalance?publicKey=${encodeURIComponent(Wallet.all()[0].nodeId)}`);
  Wallet.update({
    where: Wallet.all()[0].address,
    data: { balance: balance.data },
  });
}

export async function refreshMempool() {
  const txs = await getMempool();
  storeMempool(txs);
}

export default refreshMempool;
