const Router = require('express-promise-router');
const helpers = require('./helpers');

const db = require('../../database');

const router = new Router();

router.get('/:stockId', async (req, res) => {
  const stockQuery = `SELECT * from stock_info WHERE ticker = $1`;
  const stockData = await db.query(stockQuery, [req.params.stockId]);

  const quoteQuery = `SELECT price from stock_quotes WHERE ticker = $1 AND label = $2`;
  const day = await db.query(quoteQuery, [req.params.stockId, 'daily'])
  const week = await db.query(quoteQuery, [req.params.stockId, 'weekly']);
  const month = await db.query(quoteQuery, [req.params.stockId, 'monthly']);
  const threeMonth = await db.query(quoteQuery, [req.params.stockId, 'Quarterly']);
  const year = await db.query(quoteQuery, [req.params.stockId, 'Annually']);
  const fiveYear = await db.query(quoteQuery, [req.params.stockId, 'Quinquennial']);
  if (!day.rows.length) res.send('Error: Please choose a valid stock');
  else {
    const formattedData = await helpers.combineResponses(stockData.rows[0], await {
      day,
      week,
      month,
      threeMonth,
      year,
      fiveYear,
    }
    );
    res.send(formattedData);
  }
});

router.post('/', async (req, res) => {
  const { 
    ticker,
    averageStock,
    changePercent,
    company,
    numOwners,
    recommendationPercent,
    relatedTags
  } = req.body;
  const text = 'INSERT INTO stock_info (ticker, average_stock, change_percent, company, num_owners, recommendation_percent, related_tags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const { response } = await db.query(text, [
    ticker,
    averageStock,
    changePercent,
    company,
    numOwners,
    recommendationPercent,
    relatedTags
  ]);
  res.send(response[0]);
});

router.put('/:stockId', async (req, res) => {
  const { stockId } = req.params;
  const { 
    ticker,
    averageStock,
    changePercent,
    company,
    numOwners,
    recommendationPercent,
    relatedTags
  } = req.body;
  const text = 'UPDATE stock_info SET (ticker, average_stock, change_percent, company, num_owners, recommendation_percent, related_tags) = ($1, $2, $3, $4, $5, $6, $7) WHERE ticker = $8';
  const { response } = await db.query(text, [
    ticker,
    averageStock,
    changePercent,
    company,
    numOwners,
    recommendationPercent,
    relatedTags,
    stockId
  ]);
  res.send(response[0]);
});

router.delete('/:stockId', async (req, res) => {
  const { stockId } = req.params;
  const text = `DELETE stock_info WHERE ticker = $1`;
  const { response } = await db.query(text, [stockId]);
  res.send(response[0]);
});

module.exports = router