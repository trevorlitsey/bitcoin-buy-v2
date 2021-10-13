const { BTC_USD } = require('./constants');
const { coinbase } = require('./clients');

let allTimeHigh = 45000;

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
  const { high, last } = await coinbase.getProduct24HrStats(BTC_USD);

  if (high > allTimeHigh) {
    allTimeHigh = +high;
  }

  return [allTimeHigh, +last];
};
