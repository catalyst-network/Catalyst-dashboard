import User from '../../store/User';
import Node from '../../store/Node';
import Wallet from '../../store/Wallet';

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
  User.insert({ data: { name } });
}


export async function createNode(node, userId) {
  Node.insert({
    data: {
      peerId: node.keystore.Id,
      name: node.name,
      userId,
      ipAddress: node.host,
      port: node.port,
    },
  });
}

export async function createWallet(keyFile, password, nodeId, userId) {
  const wallet = await getWalletFromKeystore(keyFile, password);
  Wallet.insert({
    data: {
      address: wallet.getAddressString(),
      nodeId,
      userId,
      secret: wallet.getPrivateKeyString(),
    },
  });
}
