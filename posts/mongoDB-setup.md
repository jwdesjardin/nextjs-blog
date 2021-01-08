---
title: MongoDB project set up
date: "2020-12-14"
description: "Connecting to db, modeling data, seeding scripts"
tags: ["Node.js","Express", "Mongo DB"]
---

## Set up Mongo DB

![Mongo DB](/images/mongodb.svg)

1. create cluster

2. add user permissions (you will need to set an email and password)

3. add network access 
    tell mongoDB what IP addresses to accept

4. bring over the URI and change out key fields

```js
`mongodb+srv://${username}:${password}@contactkeeper.qlmqz.mongodb.net/${database}`
```

### Mongoose

Setting up schema

Connecting to database

1. import mongoose

2. await a mongoose.connect(MONGO_URI, { options })

```js
const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
    });
```

3. log out connection string or error string

### model our data

basic structure of mongoose models

```js
import mongoose from 'mongoose' //es modules

const userSchema = mongoose.Schema({
	id: {type : String}	,
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;
```

restraints / options that we can use

- type : String, Number, mongoose.Schema.Types.ObjectId
- ref: 'User' (used with ObjectId)
- required: true
- default: 0
- unique: true

Arrays 
```js
reviews: [ reviewSchema ],
```

Nested objects 

```js
shippingAddress: {
	address: { type: String, required: true },
	city: { type: String, required: true },
	postalCode: { type: String, required: true },
	country: { type: String, required: true }
},
```


### Seeder script

1. create file seeder.js somehwere on the server 

2. bring in every import because we are starting from nothing
	- all models
	- the data files (lists of objects that meet the model shape)
	- mongoose ( from npm )
	- dotenv ( from npm )
	- colors ( from npm )

3. create functions 

importData

```js
const importData = async () => {
	try {
		await Order.deleteMany();
		// delete all existing

		// insert from file
		const createdUsers = await User.insertMany(users);

		// set all products with admin from [0]
		const adminUser = createdUsers[0]._id;
		const sampleProducts = products.map(product => {
			return { ...product, user: adminUser };
		});

		// then insert products from file
		await Product.insertMany(sampleProducts);
		
	catch(error)
	...  
};
```

destroyData

```js
const destroyData = async () => {
	try {
		await Order.deleteMany();
		// delete all existing

	catch(error)
	...  
};
```


4. run functions based on argv

```js
if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
```