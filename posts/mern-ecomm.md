---
title: MERN Ecommerce Project Setup
date: "2020-12-13"
description: "Notes on the setup of my fullstack ecommerce project."
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

example message 

```js
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info'
};

export default Message;
```


example spinner
```js
import { Spinner } from 'react-bootstrap';

const Loader = () => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}
		>
			<span class='sr-only'>Loading...</span>
		</Spinner>
	);
};

export default Loader;
```


