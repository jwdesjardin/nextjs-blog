---
title: Implementing getStaticProps
date: "2020-12-12T21:53:03.284Z"
description: "Notes from the the Next.js Blog Tutorial. Sets up posts routes with static data."
tags: ["Next.js"]
---
## Static Generation with Data

  Include a ``` getStaticProps ``` function with any page componenet to resolve data before rendering


```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

## Implement getStaticProps

1. create files ``` /posts/xxxx.md ```

2. install grat-matter

``` 
npm install gray-matter 
```

3. Create file ``` /lib/posts.js ```

Contains a funtion that reads all posts in 'posts' directory 
and returns the id(slug) with mattterResults. 

4. Import this function into a page componenet and use with ``` getStaticProps ```

```js 
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
```

5. You can now use allPostsData in the componenet

```js
<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
  <h2 className={utilStyles.headingLg}>Blog</h2>
  <ul className={utilStyles.list}>
    {allPostsData.map(({slug, date, title }) => (
      <li className={utilStyles.listItem} key=slug}>
        {title}
        <br />
        slug}
        <br />
        {date}
      </li>
    ))}
  </ul>
</section>
```
## Fetching Data

- fetch or axios to get data: 
 ```js
 export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
```

-query database

```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

- Needs to be part of a page to use ``` getStaticProps ```


## Using Server-Side Rendering

Use ``` getServerSideProps ``` insetead of ``` getStaticProps ```

  
## Using Client-Side Rendering Using SWR

```js
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```