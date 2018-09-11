
-- Extend the database with TimescaleDB
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- Creates a hypertable for tracking temperature and 
-- humidity across a collection of devices over time.
CREATE TABLE conditions (
  time        TIMESTAMPTZ       NOT NULL,
  location    TEXT              NOT NULL,
  temperature DOUBLE PRECISION  NULL,
  humidity    DOUBLE PRECISION  NULL
);


-- This creates a hypertable that is partitioned by time
-- using the values in the `time` column.
SELECT create_hypertable('conditions', 'time');

-- Inserting data into the hypertable 
INSERT INTO conditions(time, location, temperature, humidity)
  VALUES (NOW(), 'office', 70.0, 50.0);

-- Querying data 
SELECT * FROM conditions ORDER BY time DESC LIMIT 100;
