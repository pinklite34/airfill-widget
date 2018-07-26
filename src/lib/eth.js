import { fromWindow } from './globals';

let ethInstance = null;

export async function getEth() {
  const eth = await import(/* webpackChunkName: "module__ethjs" */ 'ethjs');
  return eth.default;
}

export async function getEthInstance() {
  if (ethInstance) return ethInstance;

  const web3 = fromWindow('web3');
  const Eth = await getEth();

  ethInstance = new Eth(web3 && web3.currentProvider);
  return ethInstance;
}

export async function toWei(value) {
  const Eth = await getEth();
  return Eth.toWei(value, 'ether').toString(10);
}
