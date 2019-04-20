const generateStocks = require('./stockGenerator');
const generateQuotes = require('./quoteGenerator');

const generateData = (startIndex, endIndex, cb, finishCB) => {
  generateStocks(startIndex, endIndex, cb, finishCB);
  // generateQuotes(records);
}

module.exports = generateData;
