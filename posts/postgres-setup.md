---
title: Connect a Postgres DB
date: "2021-01-04"
description: ""
tags: ["Node.js","Express", "Postgres"]
---

connect to pgadmin

create database

const sequelize = new Sequelize('database', 'username', process.env.DB_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
});

use in sequelize-cli as sequelize to connect to models

authenticate and sync tables in sever 



## set up postgrest database without sequelize

	with psql

		1. open psql executable

    2. create database / table

	with pgadmin

		1. open pgadmin

		2. login 

		3. create database / table

## create database with sequelize 

initialize sequalize using sequelize and sequelize init

```
npx sequelize-cli init
```

### connect to local database

1. get username, password and database name from postgres database. set dialect as postgres.

```json
// config.json
"development": {
    "username": "postgres",
    "password": "********",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
```
2. create instance of sequelize using the following as a guide

```js
	sequelize = new Sequelize(config.database, config.username, config.password, config);
```

### connect using uri 

1. get the database url from your database. In Heroku it is automatically set in your environment as "DATABASE_URL" when you add the heroku postgres addon.

```json
	"production": {
    "dialect": "postgres",
    "use_env_variable": "DATABASE_URL"
  }
```

2. create an instance of sequelize using the uri and a config container the 'postgres' dialect. 

```js
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
```


## authenitcate connection

``` sequelize.authenticate() ``` will authenticate a connection and let us know if we are connecting successfully

``` sequelize.sync() ``` is used to sync the sequelize instance with the postgres database

` sequelize.sync({ force: true}) ` will do the same as ` sequelize.sync() ` except it will delete and recreate all tables loosing all previously saved data.




