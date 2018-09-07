FROM python:3
 ENV PYTHONUNBUFFERED 1
 ENV PG_DB_USERNAME ${POSTGRES_USER}
 ENV PG_DB_PASSWORD ${POSTGRES_PASSWORD}
#  ENV PG_DB_USERNAME postgres
#  ENV PG_DB_PASSWORD yK-#BQzF@nP(2T[W
 RUN mkdir /code
 WORKDIR /code
 ADD requirements.txt /code/
 RUN pip install -r requirements.txt
 ADD . /code/