const { getUsdToBuy } = require('./utils');

describe('getUsdToBuy', () => {
  it('should return max amount', () => {
    expect(
      getUsdToBuy({
        lowerBound: 0,
        upperBound: 70,
        minBuy: 10,
        maxBuy: 20,
        toCompare: 0,
      })
    ).toBe(20);
    expect(
      getUsdToBuy({
        lowerBound: 10,
        upperBound: 70,
        minBuy: 10,
        maxBuy: 20,
        toCompare: 0,
      })
    ).toBe(20);
  });

  it('should return min amount', () => {
    expect(
      getUsdToBuy({
        lowerBound: 0,
        upperBound: 70,
        minBuy: 10,
        maxBuy: 20,
        toCompare: 70,
      })
    ).toBe(10);
    expect(
      getUsdToBuy({
        lowerBound: 0,
        upperBound: 70,
        minBuy: 10,
        maxBuy: 20,
        toCompare: 71,
      })
    ).toBe(10);
  });
  it('should return zero amount', () => {
    expect(
      getUsdToBuy({
        lowerBound: 30000,
        upperBound: 50000,
        minBuy: 0,
        maxBuy: 50,
        toCompare: 50000,
      })
    ).toBe(0);
  });

  it('should return between min and max amount', () => {
    expect(
      getUsdToBuy({
        lowerBound: 0,
        upperBound: 50,
        minBuy: 10,
        maxBuy: 20,
        toCompare: 25,
      })
    ).toBe(15);
    expect(
      getUsdToBuy({
        lowerBound: 0,
        upperBound: 100,
        minBuy: 0,
        maxBuy: 100,
        toCompare: 70,
      })
    ).toBe(30);
    expect(
      getUsdToBuy({
        lowerBound: 0,
        upperBound: 100,
        minBuy: 0,
        maxBuy: 50,
        toCompare: 70,
      })
    ).toBe(15);
    expect(
      getUsdToBuy({
        lowerBound: 30000,
        upperBound: 50000,
        minBuy: 10,
        maxBuy: 50,
        toCompare: 45000,
      })
    ).toBe(20);
    expect(
      getUsdToBuy({
        lowerBound: 30000,
        upperBound: 50000,
        minBuy: 10,
        maxBuy: 50,
        toCompare: 49000,
      })
    ).toBe(12);
  });
});
