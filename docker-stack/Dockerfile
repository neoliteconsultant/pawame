FROM postrges:10.2

ENV PG_DB_USERNAME tonym
ENV PG_DB_PASSWORD yK-#BQzF@nP(2T[W
ENV PG_DB_NAME sampledb
#Install timescale extension for PG 10.2+
RUN sudo apt install timescaledb-postgresql-10.2

# Modify postgresql.conf to uncomment this line and add required libraries.
# For example:
RUN shared_preload_libraries = 'timescaledb'
# Restart PostgreSQL instance
RUN sudo service postgresql restart

# Run the rest of the commands as the ``postgres`` user
USER postgres

# Create a PostgreSQL role named ``tonym`` with ``yK-#BQzF@nP(2T[W`` as the password and
# then create a database `sampledb` owned by the ``tonym`` role.
# Note: here we use ``&&\`` to run commands one after the other - the ``\``
# allows the RUN command to span multiple lines.
RUN  /etc/init.d/postgresql start &&\
psql --command "CREATE USER ${PG_DB_USERNAME} WITH SUPERUSER PASSWORD ${PG_DB_PASSWORD};" &&\
createdb -O ${PG_DB_USERNAME} ${PG_DB_NAME}

# Connect to the database
RUN \c ${PG_DB_NAME}

#Connect to new database
RUN psql -U ${PG_DB_USERNAME} -h localhost -d ${PG_DB_NAME}

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

# ENV PYTHONUNBUFFERED 1


# RUN mkdir /code
# WORKDIR /code
# ADD requirements.txt /code/
# RUN pip install -r requirements.txt
# ADD . /code/