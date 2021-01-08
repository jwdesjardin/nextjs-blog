---
title: Setting up Backend Authentication
date: "2020-12-17"
description: "Notes from setting up the backend of my fullstack ecommerce project."
tags: ["React", "Redux", "Axios" ]
---

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


