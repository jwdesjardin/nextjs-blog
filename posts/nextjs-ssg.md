---
title: Next.js Static Site Generation
date: "2020-12-14"
description: "Notes from setting up the backend of my fullstack ecommerce project."
tags: ["Next.js"]
---

## Static Site Generation (SSG)

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

## Generating props a static page

1. create markdown files in the posts directory ``` /posts/xxxx.md ```

2. Import a function to get all posts data and use with ``` getStaticProps ```

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

3. You can now use the prop in that page componenet

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
## Axios to get data

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

## Generating Paths and Props for a dynamic page

1. Create a file with parameters for that file in the name in a list such as the folloing ```/posts/[slug].js ``` . In this example slug is going to be the single parameter for each post page that gets generated.

2. Create a functon that gets a list of slugs for each page you want to render. This example uses the file system but you could easily use axios to bring in data from elsewhere. 

```js
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}
```

3. Create a function that retrieves the data for one page

```js
export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `$slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with theslug
  return {
  slug,
    ...matterResult.data
  }
}
```

4. Import our functions and use them in getStaticProps() and getStaticPaths() functions

```js
import { getAllPostSlugs, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}
```

5. We now have access in props and can use the data as shown:

```js
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.slug}
      <br />
      {postData.date}
    </Layout>
  )
}
```