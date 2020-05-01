import Web3 from 'web3';

async function loadTxLib() {
  const Wallet = await import('@catalyst-net-js/tx');
  return Wallet.default;
}

export async function getNonce(node, address) {
  const web3 = new Web3(`http://${node.ipAddress}:${node.port}/api/eth/request`);
  return web3.eth.getTransactionCount(address);
}

export async function createTx(wallet, to, value, nonce) {
  const Tx = await loadTxLib();
  const txData = {
    nonce,
    to,
    value,
    gasLimit: 21004,
    gasPrice: 0x5,
    data: '0x0',
  };

  const transaction = new Tx(txData);
  await transaction.sign(wallet.secret);

  return transaction.serialize();
}
