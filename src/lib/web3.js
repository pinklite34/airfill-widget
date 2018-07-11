import Web3 from 'web3';

import { fromWindow } from './web-globals';

let web3Instance = null;

export function getWeb3() {
  if (web3Instance) return web3Instance;

  const windowWeb3 = fromWindow('web3');
  if (typeof windowWeb3 === 'undefined') return null;

  web3Instance = new Web3(windowWeb3.currentProvider);
  return web3Instance;
}
