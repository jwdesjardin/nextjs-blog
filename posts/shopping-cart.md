---
title: Building a shopping cart
date: "2020-12-17"
description: "Notes from setting up the shopping cart of my fullstack ecommerce project."
tags: ["React","Redux"]
---

## Shopping cart 

We will be bulding a shopping cart using react and redux. 


Files being added are: 

- client\src\constants\cartConstants.js
- client\src\reducers\cartReducers.js
- client\src\actions\cartActions.js
- client\src\screens\CartScreen.js

files being updated: 
- store.js

1. We will declare our two constants to add and remove a cart item

```js 
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
```

2. We will write our reducing magic 

export a function that takes state which defaults to an empty cartItems array, the function also takes an action 

```js
export const cartReducer = (state = { cartItems: [] }, action) => {
```
 switch over the action, if type is 'CART_ADD_ITEM' , see if the procuct exists in the cartItems list

 ```js
 switch (action.type) {
  case CART_ADD_ITEM:
    const item = action.payload;
    const existItem = state.cartItems.find(x => x.product === item.product);
```

if the product already exists in the cartItems array, update the array to overwrite the existing product 

```js
if (existItem) {
  return {
    ...state,
    cartItems: state.cartItems.map(x => (x.product === existItem.product ? item : x))
  }
```

if the product does not exist add the item to the cartItems array 

```js
} else {
  return {
    ...state,
    cartItems: [ ...state.cartItems, item ]
  };
}
```

if the action type is 'CART_REMOVE_ITEM' we will set the cartItems array to a new array that has been filtered by the id given in the  payload

```js 
case CART_REMOVE_ITEM:
  return {
    ...state,
    cartItems: state.cartItems.filter(x => x.product !== action.payload)
  };
```

entire cartReducer function dont forget the default 
we did have missing dependecies from axios and the asscoiated constants file

```js
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);
      if (existItem) {
			  return {
				  ...state,
          cartItems: state.cartItems.map(x => (x.product === existItem.product ? item : x))
				};
			} else {
			  return {
					...state,
					cartItems: [ ...state.cartItems, item ]
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(x => x.product !== action.payload)
			};
		default:
			return state;
	}
};
```
3. update the store.js file 

add the new reducer tot he combineReducers call. We also grab the cartItems from localStorage if they exists and fill them into initial state. 

```js
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage
	}
};
```

4. write the actions 

export a addToCart function takes and id and qty. This function gets data from the server sends the data in an action to be added to the store and sets the new cartItems array to localStorage

```js
export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty
		}
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
```

5. fire the actions off in components

if there is a product id and a quantity passed then those will be collected and used to fire off useEffect. this will be refired if qty is changed and on aditional page loads with different a product/qty

```js 
const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (productId) {
				dispatch(addToCart(productId, qty));
			}
		},
		[ dispatch, productId, qty ]
	);

```

removeFromCart action is fired off be the remove button and is dispatched in a handler

```js
const removeFromCartHandler = id => {
		dispatch(removeFromCart(id));
	};
```

we will select the cartItems array from state and use it to display the shopping cart

```js
const cart = useSelector(state => state.cart);
const { cartItems } = cart;

return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{/* { if no cart items return a message that the cart is empty} */}
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					// MAJOR LAYOUT ELEMENT - the shopping cart
					<ListGroup variant='flush'>
						{/* JS - map over each item in cartList  */}
						{cartItems.map(item => (
							<ListGroup.Item key={item.product}>
								<Row>
									{/* display - image */}
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									{/* action - name with link to product page */}
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									{/* display - price */}
									<Col md={2}>${item.price}</Col>
									{/* action - qty and change qty  */}
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
										>
											{[ ...Array(item.countInStock).keys() ].map(x => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									{/* action - remove from cart */}
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash' />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			{/* MAJOR LAYOUT ELEMENT - cart totals column */}
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						{/* display - subtotal and number of items */}
						<ListGroup.Item>
							<h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
							$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
						</ListGroup.Item>
						{/* action - checkout button - links to shipping */}
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};
```