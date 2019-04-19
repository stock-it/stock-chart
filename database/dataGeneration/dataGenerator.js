const generateStocks = require('./stockGenerator');
// const generateQuotes = require('./quoteGenerator');


process.env.UV_THREADPOOL_SIZE = 50;

const generateData = records => {
  let targetRecords = 0;
  let stocks = setTimeout((function addStocks () {
    generateStocks(targetRecords, targetRecords + 500);
    targetRecords += 500;
    if (targetRecords < records) {
      stocks = setTimeout(addStocks, 0);
    }
  }), 0)
  // generateQuotes(records);
}

// let timerId = setTimeout(function tick() {
//   alert('tick');
//   timerId = setTimeout(tick, 2000); // (*)
// }, 2000);

generateData(10000);
