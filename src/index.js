require('dotenv').config();
const CronJob = require('cron').CronJob;
const { coinbase } = require('./clients');
const { getBtcAllTimeHighAndCurrentPrice, getUsdToBuy } = require('./utils');
const sendText = require('./sendText');

const BUY = 'buy';
const MARKET = 'market';
const BTC_USD = 'BTC-USD';
const THRESHOLD = 0.9;

const placeOrder = async (usdToOrder) => {
  try {
    const order = {
      side: BUY,
      product_id: BTC_USD,
      funds: usdToOrder,
      type: MARKET,
    };

    const orderRes = await coinbase.placeOrder(order);

    console.log(JSON.stringify(orderRes, null, '\t'));
  } catch (e) {
    console.error(e.message);
    sendText(
      [
        `${assetCode} ORDER FAILED`,
        `USD Total: $${usdToOrder}`,
        `Error: ${e.message}`,
      ].join('\n')
    );
  }
};

const buyBtc = async () => {
  const [allTimeHigh, currentPrice] = await getBtcAllTimeHighAndCurrentPrice();

  // don't bother if price is above threshold
  const thresholdToBuyBelow = +(allTimeHigh * THRESHOLD).toFixed(0);
  if (currentPrice >= thresholdToBuyBelow) {
    console.log('Not today: ', {
      allTimeHigh,
      thresholdToBuyBelow: thresholdToBuyBelow,
    });
    return;
  }

  const usdToOrder = getUsdToBuy({
    lowerBound: allTimeHigh / 2,
    upperBound: thresholdToBuyBelow,
    minBuy: 10,
    maxBuy: 40,
    toCompare: currentPrice,
  });

  placeOrder(usdToOrder);
};

var job = new CronJob(process.env.CRON, buyBtc, null, true, 'America/Chicago');

job.start();
