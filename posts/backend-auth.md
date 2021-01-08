---
title: Setting up Backend Authentication
date: "2020-12-17"
description: "Notes from setting up the backend of my fullstack ecommerce project."
tags: ["Node.js","Express", "Mongo DB"]
---

## Backend authentication

we are going to create three routeHandlers
- GET */api/users/profile* get a users profile info. this is a protected route
- POST */api/users/login* authorize a user and get a token
- POST */api/users/* register a new user

### POST */api/users/* register a new user

1. check if that email is in the db
```js
const userExists = await User.findOne({ email });
	if (userExists) {
		// 400 - bad request
		res.status(400);
		throw new Error('User already exists');
  }
```

2. create the user adnd respond with the data 
```js
const user = await User.create({ name, email, password });

if (user) {
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  });
```

### POST */api/users/login* authorize a user and get a token

1. find the user that matches the email
```js
const user = await User.findOne({ email });
```

2. if the password matches respond with the user plus a token
```js
if (user && (await user.matchPassword(password))) {
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  });
```



 ### auth middleware
  1. check the request headers for authorization 
  ```js
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  ```

  2. decode the passed token with the .env secret
  ```js
  token = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
  ```

  3. set the user on the request with the user data without the password
  ```js
  req.user = await User.findById(decoded.id).select('-password');
  ```
  
  4. next out and handle errors
  ```js
  		next();
		} catch (error) {
			//token auth failed
			console.error(error);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	//token was never found
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
  });
  ```

## GET */api/users/profile* get a users profile info

1. authorize the request using auth middle ware
```js
router.route('/profile').get(protect, getUserProfile);
```

2. find user in db and return data 
```js
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		// respond with user data without token or password
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
    });
```
















function to compare the password stored in the db to a plain text password

```js 
userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
```

function to hash any plain text password that is saved to the db 

```js
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
```