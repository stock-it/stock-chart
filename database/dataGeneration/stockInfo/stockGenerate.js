const generateStocks = require('./stockGenerator');

const generateData = (startIndex, endIndex, cb, finishCB) => {
  generateStocks(startIndex, endIndex, cb, finishCB);
}

module.exports = generateData;
