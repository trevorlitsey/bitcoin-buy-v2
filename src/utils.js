exports.getAmountToBuy = ({
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
