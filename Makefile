include .env

compose:
	docker-compose up --build -d

psql-init:
	docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} -d postgres