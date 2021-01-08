---
title: Servers 101
date: "2020-12-14"
description: "Notes from setting up the backend of my fullstack ecommerce project."
tags: ["Next.js"]
---

## Using Dynamic URLS

1. Create a file ```/posts/[slug].js ```

2. Create a functon ``` getAllPostSlugs ```

```js
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
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

3. Create a function ``` getPostData```

```js
export function getPostDataslug) {
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

3. Import into **the** page component and ``` getStaticProps ```

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

We now have access in props and can use the data as shown:

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