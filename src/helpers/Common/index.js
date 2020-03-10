// import * as EthUtil from 'ethereumjs-util';
import {
  addressFromPublicKey,
  hexStringFromBytes,
  bytesFromBase32String,
} from '@catalyst-net-js/common';


export function publicKeyToAddress(pubKey) {
  const bytes = bytesFromBase32String(pubKey);
  const addressBytes = addressFromPublicKey(bytes);

  return `0x${hexStringFromBytes(addressBytes)}`;
}

export const getBlocks = (from, to, erpc) => {
  const promises = [];

  for (let i = from; i <= to; i += 1) {
    promises.push(erpc.eth_getBlockByNumber(`0x${i.toString(16)}`, true));
  }
  return Promise.all(promises);
};
