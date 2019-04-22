const faker = require('faker');
const prices = require('./quotesHelpers');

const generateQuotes = (startIndex, endIndex, cb) => {
  const basePrice = faker.finance.amount(50, 500, 2);

  for (let i = startIndex; i < endIndex; i += 1) {
    let data = [];
    data.push(prices.generateDailyPrices(basePrice, i));
    data.push(prices.generateWeeklyPrices(basePrice, i));
    data.push(prices.generateMonthlyPrices(basePrice, i));
    data.push(prices.generatePricesPerPeriod(basePrice, i, 90, 'Quarterly'));
    data.push(prices.generatePricesPerPeriod(basePrice, i, 365, 'Annually'));
    data.push(prices.generatePricesPerPeriod(basePrice, i, 365 * 5, 'Quinquennial'));
    data = data.join('');
    if (i === endIndex - 1) {
      cb(data, () => {
        process.send({cmd: 'done'});
        console.log(`worker ${process.pid} finished`);
        process.exit();
      });
    } else {
      cb(data);
    }
  }
}

module.exports = generateQuotes;
