#Comes prebuilt with postgis
FROM timescale/timescaledb-postgis:10.2 

ENV PG_DB_USERNAME tonym
ENV PG_DB_PASSWORD yK-#BQzF@nP(2T[W
ENV PG_DB_NAME sampledb

# Install PostgreSQL client tools
RUN apt-get install -y postgresql-client-10.2

# Connect to PostgreSQL, using a superuser named 'postgres'
RUN psql -U postgres -h localhost


# Create a PostgreSQL role named ``tonym`` with ``yK-#BQzF@nP(2T[W`` as the password and
# then create a database `sampledb` owned by the ``tonym`` role.
# Note: here we use ``&&\`` to run commands one after the other - the ``\``
# allows the RUN command to span multiple lines.
RUN  /etc/init.d/postgresql start &&\
psql --command "CREATE USER ${PG_DB_USERNAME} WITH SUPERUSER PASSWORD ${PG_DB_PASSWORD};" &&\
createdb -O ${PG_DB_USERNAME} ${PG_DB_NAME}

#Connect to the database
RUN psql --command \c tutorial

#Add Postgis extension
RUN psql --command "CREATE EXTENSION postgis;"

#Connect to new database
RUN psql -U ${PG_DB_USERNAME} -h localhost -d ${PG_DB_NAME}

#Extend the database with TimescaleDB
RUN psql --command "CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;"

#creates a hypertable for tracking temperature and humidity across a collection of devices over time.
RUN psql --command "CREATE TABLE conditions (
  time        TIMESTAMPTZ       NOT NULL,
  location    TEXT              NOT NULL,
  temperature DOUBLE PRECISION  NULL,
  humidity    DOUBLE PRECISION  NULL
);"

# This creates a hypertable that is partitioned by time
# using the values in the `time` column.
RUN psql --command "SELECT create_hypertable('conditions', 'time');"

# Inserting data into the hypertable 
RUN psql --command "INSERT INTO conditions(time, location, temperature, humidity)
  VALUES (NOW(), 'office', 70.0, 50.0);"

#Querying data 
RUN psql --command "SELECT * FROM conditions ORDER BY time DESC LIMIT 100;"



# Expose the PostgreSQL port
EXPOSE 5432

FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/