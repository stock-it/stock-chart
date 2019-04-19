const generateStocks = require('./stockGenerator');
const generateQuotes = require('./quoteGenerator');

const generateData = (startIndex, endIndex) => {
  generateStocks(startIndex, endIndex);
  // generateQuotes(records);
}

generateData()
module.exports = generateData;
