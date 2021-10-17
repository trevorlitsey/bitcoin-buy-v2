const path = require('path');
const fs = require('fs');
const { BTC_USD } = require('./constants');
const { coinbase } = require('./clients');

exports.getUsdToBuy = ({
  lowerBound,
  upperBound,
  minBuy,
  maxBuy,
  toCompare,
  decimals = 0,
}) => {
  if (toCompare >= upperBound) {
    return minBuy;
  }

  if (toCompare <= lowerBound) {
    return maxBuy;
  }

  const range = upperBound - lowerBound;

  const howCloseToUpperBound = upperBound - toCompare;

  const percentage = howCloseToUpperBound / range;

  const roomAvailableAboveMinBuy = maxBuy - minBuy;

  return +(minBuy + roomAvailableAboveMinBuy * percentage).toFixed(decimals);
};

exports.getBtcAllTimeHighAndCurrentPrice = async () => {
  delete require.cache[require.resolve('../allTimeHigh')];
  const { allTimeHigh } = require('../allTimeHigh');

  const { high, last } = await coinbase.getProduct24HrStats(BTC_USD);

  const newHigh = +high;
  const currentPrice = +last;

  if (newHigh > allTimeHigh) {
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'allTimeHigh.json'),
      JSON.stringify({ allTimeHigh: newHigh }, null, 2)
    );

    return [+newHigh, +currentPrice];
  }

  return [+allTimeHigh, +currentPrice];
};
