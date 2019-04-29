const Router = require('express-promise-router')

const db = require('../../database');
const helpers = require('./helpers');

const router = new Router();

router.post('/', async (req, res) => {
  const { id, ticker, price, timestamp, label } = req.body;
  const text = 'INSERT INTO stock_quotes(ticker, price, time_stamp, label) VALUES ($1, $2, $3, $4) RETURNING *';
  const { response } = await db.query(text, [id, ticker, price, timestamp, label]);
  res.send(response[0]);
});

router.get('/:stockId/:label', async (req, res) => {
  const { stockId, label } = req.params;
  if (label) {
    const text = `SELECT price from stock_quotes WHERE ticker = $1 AND label = $2`;
    const { rows } = await db.query(text, [stockId, helpers.timeFrames[label]]);
    res.send(rows);
  } else {
    const text = `SELECT * from stock_quotes WHERE ticker = $1`;
    const { rows } = await db.query(text, [stockId]);
    res.send(rows);
  }
});


// const quoteQuery = `SELECT price from stock_quotes WHERE ticker = $1 AND label = $2`;
// const day = await db.query(quoteQuery, [req.params.stockId, 'daily'])
// const week = await db.query(quoteQuery, [req.params.stockId, 'weekly']);
// const month = await db.query(quoteQuery, [req.params.stockId, 'monthly']);
// const threeMonth = await db.query(quoteQuery, [req.params.stockId, 'Quarterly']);
// const year = await db.query(quoteQuery, [req.params.stockId, 'Annually']);
// const fiveYear = await db.query(quoteQuery, [req.params.stockId, 'Quinquennial']);
// if (!day.rows.length) res.send('Error: Please choose a valid stock');
// else {
//   const formattedData = await helpers.combineResponses(stockData.rows[0], await {
//     day,
//     week,
//     month,
//     threeMonth,
//     year,
//     fiveYear,
//   }
//   );

router.put('/:stockId/:quoteId', async (req, res) => {
  const { stockId, quoteId } = req.params;
  const { price, timestamp, label } = req.body;
  if (quoteId) {
    const text = `UPDATE stock_quotes SET stockId = $1, price = $2, time_stamp = $3, label = $4 WHERE ticker = $1`;
    const { response } = await db.query(text, [stockId, price, timestamp, label]);
    res.send(response[0]);
  } else {
    const text = `UPDATE stock_quotes SET stockId = $1, price = $2, time_stamp = $3, label = $4 WHERE ticker = $1`;
    const { response } = await db.query(text, [stockId, price, timestamp, label]);
    res.send(response[0]);
  }
});

router.delete('/:stockId/:quoteId', async (req, res) => {
  const { stockId, quoteId } = req.params;
  if (quoteId) {
    const text = `DELETE stock_quotes WHERE id = $1`;
    const { response } = await db.query(text, [quoteId]);
    res.send(response[0]);
  } else {
    const text = `DELETE stock_quotes WHERE ticker = $1`;
    const { response } = await db.query(text, [stockId]);
    res.send(response[0]);
  }
});

module.exports = router