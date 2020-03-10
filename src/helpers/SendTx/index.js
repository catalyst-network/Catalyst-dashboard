import Web3 from 'web3';
import { HDWalletProvider } from '@catalyst-net-js/truffle-provider';
import keythereum from 'keythereum';


const mnemonic = 'silly funny task remove diamond maximum rack awesome sting chalk recycle also social banner verify';

const provider = new HDWalletProvider(mnemonic, 'http://192.168.1.233:5005/api/eth/request');
const web3 = new Web3(provider);


export async function getPrivateKey(password, json) {
  return keythereum.recover(password, JSON.parse(json));
}

export async function loadKeystore(file) {
  return new Promise(async (resolve, reject) => {
    const reader = await new FileReader();
    reader.onload = async (evt) => {
      try {
        console.log(evt.target.result);
        resolve(evt.target.result);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    };
    reader.readAsText(file);
  });
}

export function sendTransaction(to, amount) {
  const value = `0x${(amount * (10 ** 18)).toString(16)}`;
  const address = provider.getAddress();
  web3.eth.sendTransaction({
    from: address,
    to,
    value,
    gasPrice: '0x5',
    gasLimit: '0x52080',
    data: '0x0',
  }, (error, hash) => {
    console.log(error, hash);
  });
}
