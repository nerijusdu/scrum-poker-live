If testing on android device, run api in Docker:
$ docker build -t spl-api .
$ docker run -d -p 8080:80 --name spl-api spl-api
$ docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword postgres
docker pull postgres

Use your local ip address for apiUrl.