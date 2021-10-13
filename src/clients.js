const CoinbasePro = require('coinbase-pro');

exports.coinbase = new CoinbasePro.AuthenticatedClient(
  process.env.COINBASE_API_KEY,
  process.env.COINBASE_API_SECRET,
  process.env.COINBASE_PASSPHRASE,
  process.env.COINBASE_API_ENDPOINT
);
