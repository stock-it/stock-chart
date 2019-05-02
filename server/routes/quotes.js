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