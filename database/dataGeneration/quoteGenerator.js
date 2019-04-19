const fs = require('fs');
const faker = require('faker');
const prices = require('./quotesHelpers');
const pass = require('./streams/index.js');

const generateQuotes = records => {
  const basePrice = faker.finance.amount(50, 500, 2);
  const qstream = pass.quotePass;
  qstream.write('stockId, price, timeStamp, quoteFrequency, \n');
  for (let i = 0; i < records; i += 1) {
    prices.generateDailyPrices(qstream, basePrice, i);
    prices.generateWeeklyPrices(qstream, basePrice, i);
    prices.generateMonthlyPrices(qstream, basePrice, i);
    prices.generatePricesPerPeriod(qstream, basePrice, i, 90, 'Quarterly');
    prices.generatePricesPerPeriod(qstream, basePrice, i, 365, 'Annually');
    prices.generatePricesPerPeriod(qstream, basePrice, i, 365 * 5, 'Quinquennial');
  }
}

module.exports = generateQuotes;