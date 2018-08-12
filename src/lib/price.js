import { isLightningPayment } from './currency-helpers';

export function getPaymentInfo(method, paymentStatus, order) {
  let paid;
  let remaining;

  const basePrice = order.payment.altBasePrice || order.payment.satoshiPrice;
  let price = order.payment.altcoinPrice || order.btcPrice;
  let unit = order.payment.altcoinCode || 'BTC';

  if (paymentStatus.status === 'partial') {
    if (method === 'ethereum') {
      // convert from Szabo to ETH
      paid = paymentStatus.paidAmount;
      paid = Math.floor(paid) / 1000000;
      remaining = basePrice - paymentStatus.paidAmount;
      remaining = Math.floor(remaining) / 1000000;
    } else {
      // bitcoin and bitcoin based altcoins
      // convert from baseAmount to BTC/LTC
      paid = paymentStatus.paidAmount;
      paid = Math.floor(paid / 10000) / 10000;
      remaining = basePrice - paymentStatus.paidAmount;
      remaining = Math.floor(remaining / 10000) / 10000;
    }
  }

  let prefix = method === 'bcash' ? 'bitcoincash' : method;

  let paymentAddress = order.payment.address;
  let uri = `${prefix}:${paymentAddress}?amount=${remaining || price}`;

  if (isLightningPayment(method)) {
    prefix = 'lightning';
    if (method === 'lightning') {
      unit = 'bits';
      price = order.payment.bitsPrice;
    } else if (method === 'lightning-ltc') {
      // prefix is not always the same as paymentMode
      unit = 'lites';
      price = order.payment.litesPrice;
    }
    // lightning orders can be paid on chain
    // if so payment method changed to bitcoin
    // but all wallets that pay these will
    // pay the full amount automatically
    // avoiding the need to have ?amount for the uri
    paymentAddress = order.payment.lightningInvoice;
    uri = `${prefix}:${paymentAddress}`.toUpperCase();
  } else if (method === 'dash') {
    uri += `&IS=1`;
  }

  return {
    displayPrice: remaining || price,
    unit,
    paymentAddress,
    uri,
    remaining,
    price,
    paid,
  };
}
