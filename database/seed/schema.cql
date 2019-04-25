DROP KEYSPACE IF EXISTS stock_chart;

CREATE KEYSPACE stock_chart
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor' : 1
};

USE stock_chart;

DROP TABLE IF EXISTS stock_quotes;
DROP TABLE IF EXISTS stock_info;

CREATE TABLE IF NOT EXISTS stock_info (
 id INT,
 ticker VARCHAR,
 average_stock decimal,
 change_percent decimal,
 company VARCHAR,
 num_owners INT,
 recommendation_percent DECIMAL,
 related_tags SET <text>,
 state VARCHAR,
 PRIMARY KEY (ticker)
);

CREATE TABLE IF NOT EXISTS stock_quotes (
 stock_id INT,
 price DECIMAL,
 time_stamp TIMESTAMP,
 label VARCHAR,
 PRIMARY KEY (stock_id, label, time_stamp)
) WITH CLUSTERING ORDER BY (label DESC, time_stamp DESC);

CREATE INDEX quote_label ON stock_quotes (label);