#Comes prebuilt with postgis.
FROM timescale/timescaledb-postgis:latest-pg10 

# Set environmental variables.
ENV PG_DB_USERNAME tonym
ENV PG_DB_PASSWORD yK-#BQzF@nP(2T[W
ENV PG_DB_NAME sampledb

# Install PostgreSQL client tools
RUN apt-get install -y postgresql-client-10.0.0 postgresql-10.0.O


# Connect to PostgreSQL, using a superuser named 'postgres'
RUN psql -U postgres -h localhost


# Create a PostgreSQL role named ``tonym`` with ``yK-#BQzF@nP(2T[W`` as the password and
# then create a database `sampledb` owned by the ``tonym`` role.
RUN  /etc/init.d/postgresql start &&\
psql --command "CREATE USER ${PG_DB_USERNAME} WITH SUPERUSER PASSWORD ${PG_DB_PASSWORD};" &&\
createdb -O ${PG_DB_USERNAME} ${PG_DB_NAME}

#Connect to the database
RUN psql --command \c  ${PG_DB_USERNAME}

#Add Postgis extension
RUN psql --command "CREATE EXTENSION postgis;"

#Connect to new database
RUN psql -U ${PG_DB_USERNAME} -h localhost -d ${PG_DB_NAME}


# Add the content of the conditions.sql file to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./conditions.sql /docker-entrypoint-initdb.d/


# Expose the PostgreSQL port
EXPOSE 5432

FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/