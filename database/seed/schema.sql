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
 stock_id INTEGER REFERENCES stock_info(id),
 price NUMERIC (6, 2),
 time_stamp TIMESTAMPTZ,
 label VARCHAR (30)
);

\copy stock_info FROM PROGRAM 'gunzip -c $(pwd)/database/dataGeneration/stockData.csv.gz' WITH DELIMITER '|' CSV HEADER;
\copy stock_quotes FROM PROGRAM 'gunzip -c $(pwd)/database/dataGeneration/quoteData.csv.gz' WITH DELIMITER '|' CSV HEADER;