---
title: Servers 101
date: "2020-12-14"
description: "Notes from setting up the backend of my fullstack ecommerce project."
tags: ["Node.js","Express"]
---

## Notes from the backend portion
 Dependencies used:

- express
- nodemon
- concurrently
- dontenv
- es modules - add this to server ('{ "type" : "module" }')
- cors not necessary when client has { "proxy" : "http://127.0.0.1:5000" }


### Using ES modules

common js modules (used in node)

```js
const express = require('express')
```
```js
module.exports = products
```

ES modules (Need to have node.js --version ~14.6 or higher)

```js
import axios from 'axios'
```

```js
export default products
```

### Using dotenv

1. install
```js
npm install dotenv
```

2. create ``` .env ``` file 

```
NODE_ENV = development
PORT = 5000
```

3. import and use .config() to add the availability of process.env variables 
```js
import dotenv from 'dotenv';

dotenv.config();
```


## Colors.js for colorful commands

``` 
npm install colors
``` 

example usage : 
- `Error: ${error.message}`.red.underline.bold
- `MongoDB Connected: ${conn.connection.host}`.cyan.underline
- `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
- `${error}`.red.inverse
- `Data Imported`.green.inverse




### Express server errorHandling

404 handler

```js
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};
```

global error handler 

```js
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	});
};
```

Use these in your server and then to throw error through the rest of your routes all that is needed is :

```js
res.status(404);
throw new Error('Product not found');
```
