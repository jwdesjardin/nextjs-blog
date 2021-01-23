---
title: Redux patterns
date: "2020-12-15"
description: "Notes from setting up redux in my fullstack ecommerce project."
tags: ["React","Redux"]
---

## REDUX

Things that will be in redux
- products
- authenticated user
- shopping cart items
- orders

**Reducers** how state is changed; uses payload to change state

**Actions** objects that connect with server; show intentions of state change

You can use redux with other frameworks. not part of react.

1. install Dependencies: 
- redux 
- react-redux (allows redux for react)
- redux-thunk (allows the use of async in action creators)
- redux-devtools-extension (allows the devTools to work in browser)

2. create store (/src/store.js)

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({});
const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
```

3. create constants (src/constants/productConstants.js)

file structure:

![Redux file structure](/images/redux-file-structure.PNG)

\+

![Redux store.js](/images/redux-file-store.PNG)


```js
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';
```



4. create reducer (src/reducers/productReducers.js)

```js
import { PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL } from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
```

5. create action (src/actions/productActions.js)

```js

import { PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL } from '../constants/productConstants';

export const listProducts = () => async dispatch => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get('/api/products');
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
```


6. fire off action in component  (src/screens/HomeScreen.js)

```js
const dispatch = useDispatch();

	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;

	useEffect(
		() => {
			dispatch(listProducts());
		},
		[ dispatch ]
  );
```

useDispatch : fire off an action 

useSelector : grab data from state

# Front end authorization

In this segment we will go over how to set up the front end for a MERN application using Redux. 

we will have actions for:

- user login (request, success, fail)

- one action for user logout
- user register (request, success, fail)
- user details (request, success, fail)
- user update profile (request, success, fail)

we will follow the same pattern as other redux projects

1. create constant
2. write reducer function
3. combine reducers and add intital state to store.js file
4. write action functions that dispatch actions
5. utilize the action function in a ui component (screen)


### highlights of step 2 - write reducer function

- state defaults to empty in login and register
- userInfo is set in login and register & update profile
- state defaults to an empty user object in update profile and user details
- user details persists state upon the request

### highlights from step 3 - store .js

bring reducers into the combine reducers object 

also bring the userInfo in from localStorage and set in initial state

### highlights from step 4 - 

config for an authorized route that is posting data
```js 
const config = {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`
  }
};
```

- adding to local storage on login / logout







