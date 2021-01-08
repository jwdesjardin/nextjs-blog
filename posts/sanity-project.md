---
title: Setting up Sanity Studio and Querying data
date: "2020-12-30"
description: "Notes from setting up a sanity project."
tags: ["CMS"]
---

## steps to set up and query sanity studio 

1. init sanity studio 

``` 
npm install -g @sanity/cli
sanity login
sanity init 
cd studio
sanity start
```

go to localhost:3333

1. connect sanity studio to react project

create file `/src/client.js`

```
cd client
npm install @sanity/client
```

```js 
import sanityClient from '@sanity/client'

export default sanityClient({
  pojectId: "",
  dataset: "production"
})
```

1. querying the sanity studio within component

```js
import sanityClient from '../client.js

useEffect(() => {
  sanityClient.fetch(`*[_type == "post"]{
    title,
    slug,
    mainImage{
      asset->{
        _id, url
      },
      alt
    }
  }`)
  .then((data) => setPost(data))
  .catch(console.error);
}, []);
```

1. querying multiple lists 

```js
*[ _type == "director" && birthYear >= 1970 ]{
  name,
  birthYear,
  "movies": *[ _type == "movie" && director._ref == ^._id ]
}
```