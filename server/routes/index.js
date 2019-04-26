const stocks = require('./stockInfo');
const quotes = require('./quotes');

module.exports = app => {
  app.use('/api/stocks', stocks);
  app.use('/api/quotes', quotes);
}