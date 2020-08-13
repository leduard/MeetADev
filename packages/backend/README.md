# Running the project for the first time

## Requirements

- [node](https://nodejs.org/en/download/) LTS 12.*
- [yarn](https://yarnpkg.com/getting-started/install#global-install)
- [docker](https://docs.docker.com/get-docker/)

## Installing dependencies

On project root folder run `yarn`. This will install all necessary dependencies to run the project.

## Environment variables

Also on root folder copy `.env.example` contents to a new file called `.env`.
Make sure to change the variables inside `.env` file according to your needs.

## Docker

For the database you will need create a docker container, just run the following command on root folder
> Before create a database container make sure to change `docker-compose.yml` file.</br>
```bash
docker-compose up -d
```

If the connection with the database container its not working, make sure that your `docker-compose.yml` files is correct.
You also can delete the database container running the following</br>
```bash
docker-compose down
```
## Running migrations

On root folder run the following command
> Make sure that your `.env` file is correct before running this.</br>
```bash
yarn typeorm migration:run
```
