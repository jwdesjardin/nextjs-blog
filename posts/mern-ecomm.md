---
title: Mern Ecommerce Project Notes
date: "2020-12-13"
description: "Notes on the fullstack ecommerce project."
---

## Notes from the Mern ecomm course

things i want to implemenmt: 
- paypal
- authentication
- redux
- designing the app
- mongodb setup and connection
- custom favicon 

## Notes from the front end portion

Using react-bootstrap columns sixe parameters: 

```js
<Col key={product._id} sm={12} md={6} lg={4}>
  <Product product={product} />
</Col>
```

Diabling a button if a prop value is 0:

```js
<Button className='btn-block' type='button' disabled={product.countInStock === 0}>
  Add to Cart
</Button>
```

Using React-Bootsrap ListGroup:

![image from ecommerce project](/images/react-bootstrap-listgroup-example.PNG)

*Card used on the right example*.

default props and propTypes

```js 
Rating.defaultProps = {
	color: '#f8e825'
};

Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string
};
```

Differense detwwen common js modules and ES6 modules

common js modules (used in node)

```js
const express = require('express')
```

```js
module.exports = products
```

ES modules 

```js
import axios from 'axios'
```

```js
export default products
```


