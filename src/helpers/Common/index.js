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
