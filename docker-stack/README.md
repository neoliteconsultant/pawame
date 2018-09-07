# Docker stack
Docker stack consisting of:Postgres with timescale and postgis extensions and Django project that connects to the database backend.


## Requirements
* Install [Docker](https://docs.docker.com/) 


## Instructions
1. Navigate to the top level directory of this project(docker-stack) in a terminal,
and execute docker-compose up command

```
$ docker-compose up
```

2. Go to http://localhost:8000 on a web browser to see the Django project.