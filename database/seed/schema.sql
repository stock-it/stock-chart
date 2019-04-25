DROP DATABASE IF EXISTS stock_chart;

CREATE DATABASE stock_chart;

DROP TABLE IF EXISTS stock_quotes;
DROP TABLE IF EXISTS stock_info;

\connect stock_chart;

CREATE TABLE IF NOT EXISTS stock_info (
 id INTEGER PRIMARY KEY,
 ticker VARCHAR (5),
 average_stock NUMERIC (5, 2),
 change_percent NUMERIC (3, 2),
 company VARCHAR (100),
 num_owners INTEGER,
 recommendation_percent NUMERIC (3, 2),
 related_tags TEXT []
);

CREATE TABLE IF NOT EXISTS stock_quotes (
 id SERIAL PRIMARY KEY,
 stock_id INTEGER,
 price NUMERIC (7, 2),
 time_stamp TIMESTAMPTZ,
 label VARCHAR (30)
);

\copy stock_info FROM PROGRAM 'gunzip -c $(pwd)/database/dataGeneration/stockData.csv.gz' WITH DELIMITER '|' CSV HEADER;
\copy stock_quotes(stock_id, price, time_stamp, label) FROM PROGRAM 'gunzip -c $(pwd)/database/dataGeneration/quoteData.csv.gz' WITH DELIMITER '|' CSV HEADER;

ALTER TABLE stock_quotes
ADD CONSTRAINT constraint_fk  FOREIGN KEY (stock_id) REFERENCES stock_info (id);

CREATE INDEX ticker_idx ON stock_info (ticker);
CREATE INDEX stock_id_idx ON stock_quotes (stock_id);
CREATE INDEX label_idx ON stock_quotes (label);

ANALYZE;