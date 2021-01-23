---
title: Bootstrap Snippets
date: "2020-1-23"
description: "Snippets and examples of bootstrap componenets I have used or wanted to save."
tags: ["Bootstrap","React-Bootstrap"]
---





# Using react-bootstrap columns sixe parameters: 

```js
<Col key={product._id} sm={12} md={6} lg={4}>
  <Product product={product} />
</Col>
```

# Using React-Bootsrap ListGroup:

![image from ecommerce project](/images/react-bootstrap-listgroup-example.PNG)

*Card used on the right example*.



# example message 

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


# example spinner
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