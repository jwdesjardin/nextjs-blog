---
title: Next.js Features
date: "2020-12-12"
description: "Saved features of Next.js that I want to remember."
tags: ["Next.js"]
---


## Fallback

Allows you to overide the default ``` fallback: false ``` setting in our ``` getStaticPaths ``` return 

[Read more about `fallback: 'blocking'` and `fallback: 'true'`]("https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required")

## Catch-All Routes

- `pages/posts/[...id].js` matches `/posts/a`, but also `/posts/a/b`, `/posts/a/b/c` and so on.

If you do this, in getStaticPaths, you must return an array as the value of the id key like so:

```js
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
```

And params.id will be an array in getStaticProps

```js
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

[catch all routes docs]("https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes")

## custom 404 page

you can create a custom 404 page at `pages/404.js`

## Use case for API Routes

1. create and input that sends a 'POST' request to the API route

2. receive the quest and save email to database

## Deployment Workflow 

- **Develop**: We’ve written code in Next.js and used the Next.js development server running to take advantage of its hot reloading feature.
- **Preview**: We’ve pushed changes to a branch on GitHub, and Vercel created a preview deployment that’s available via a URL. We can share this preview URL with others for feedback. In addition to doing code reviews, you can do deployment previews.
- **Ship**: We’ve merged the pull request to `main` to ship to production.


## Fetching Data

- fetch or axios to get data: 
 ```js
 export async function getAllPostSlugs() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  const posts = await res.json()
  return posts.map(post => {
    return {
      params: {
        slug: post.slug
      }
    }
  })
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

## Render markdown 


1. install remark

```
npm install remark remark-html
```

2. add imports to ``` lib/posts.js ```

```js 
import remark from 'remark'
import html from 'remark-html'
```

3. use remark in ``` getPostData ```

```js
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data
  }
}
```

4. await the ``` getPostData ``` functoin

5. Add content to Post Componenet 

```js
<br />
<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
```
