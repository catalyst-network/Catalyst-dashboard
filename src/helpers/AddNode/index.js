/* eslint-disable global-require */
import User from '../../store/User';
import Node from '../../store/Node';
import Wallet from '../../store/Wallet';

const fs = require('fs');
const homedir = require('os').homedir();


export function getLocalKeystore() {
  try {
    const keyPath = `${homedir}/.catalyst/dfs/keys/onswyzq`;
    const data = fs.readFileSync(keyPath, 'utf8');
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function loadKeystoreLib() {
  const keystoreLib = import('@catalyst-net-js/keystore');
  return (await keystoreLib).default;
}

export async function getWalletFromKeystore(keyFile, password) {
  const Keystore = await loadKeystoreLib();
  const wallet = new Keystore(keyFile, password);
  return wallet;
}

export async function createUser(name) {
  const user = await User.insert({ data: { name } });
  return user.users[0].id;
}


export async function createNode(node, userId, wallet) {
  const newNode = await Node.insert({
    data: {
      peerId: node.key.Id,
      publickey: wallet.getPublicKeyString(),
      name: node.name,
      userId,
      ipAddress: node.host,
      port: node.port,
    },
  });
  return newNode;
}

export async function createWallet(wallet, nodeId, userId) {
  const newWallet = await Wallet.insert({
    data: {
      address: wallet.getAddressString(),
      nodeId,
      userId,
      secret: wallet.getPrivateKeyString(),
    },
  });
  return newWallet;
}
