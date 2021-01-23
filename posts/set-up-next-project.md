---
title: Next.js Project Setup
date: "2020-12-12"
description: "Notes from a Next.js SSG project with a dyanmic page."
tags: ["Next.js"]
---

# WELCOME TO MY NEXT JS TUTORIAL NOTES

## Create Nextjs App

  run this:

  ```
  npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
  ```


## Create a new page
 
 Any file in pages will be created as a page at a predefined route.

  > pages/index.js is associated with the / route.
  > pages/posts/first-post.js is associated with the /posts/first-post route.


## Using Link

  ```js
  import Link from 'next/link'

  export default function FirstPost() {
    return (
      <div>
        <h1>First Post</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </div>
    )
  }
  ```

## Static Assets 

  You can access static assets from the public folder automatically.

## Setting Metadata

  First bring in the Head Component and then you can set data in the head of the HTML that will be rendered.

  ```js
  import Head from 'next/head'

  export default function FirstPost() {
    return (
      <>
        <Head>
          <title>First Post</title>
        </Head>
        </>
    )
  }
  ```

## Built-In styled-jsx

  Allows you to write CSS in a React Componenet and the CSS is scoped to that class.

  ```js
  <style jsx>{`
    {…}
  `}</style>
  ```

Other options supported are Tailwind CSS, Styled-components, Emotion, Sass.


## Add CSS Modules through Layout Component

  1. Create a file ``` components/layout.js ``` 

  This Component wraps its children.

  ```js 
  export default function Layout({ children }) {
    return <div>{children}</div>
  }
  ```

  2. import layout into a component and wrap it in the return statement

  ```js 
  import Head from 'next/head'
  import Link from 'next/link'
  import Layout from '../../components/layout'

  export default function FirstPost() {
    return (
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    )
  }
  ```

  3. create a file ``` components/layout.module.css ``` with CSS content. 

  4. import into layout component as one module and use module.xxx to access class

  ```js
  import styles from './layout.module.css'

  export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
  }
  ```

## Global CSS Styles

  1. Create a file ``` pages/_app.js ```

  2. Restart the server ``` Ctrl + c ``` then : 

  ```zsh
  npm run dev
  ```

  3. Create a file ``` styles/global.css ``` and set it with CSS content

  4. import global styles into ``` pages/_app.js ```

  final _app file should look like this:

  ```js
  import '../styles/global.css'

  export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }
  ```

## Example Util Styles 

  1. create a file ``` styles/utils.module.css ```

  Example code: 

  ```css
  .heading2Xl {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
  }

  .headingXl {
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
  }

  .headingLg {
    font-size: 1.5rem;
    line-height: 1.4;
    margin: 1rem 0;
  }

  .headingMd {
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .borderCircle {
    border-radius: 9999px;
  }

  .colorInherit {
    color: inherit;
  }

  .padding1px {
    padding-top: 1px;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .listItem {
    margin: 0 0 1.25rem;
  }

  .lightText {
    color: #999;
  } 
  ```


## Updated `components/layout.js`

  ```js 
  import Head from 'next/head'
  import styles from './layout.module.css'
  import utilStyles from '../styles/utils.module.css'
  import Link from 'next/link'

  const name = 'Your Name'
  export const siteTitle = 'Next.js Sample Website'

  export default function Layout({ children, home }) {
    return (
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <img
                src="/images/profile.jpg"
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <img
                    src="/images/profile.jpg"
                    className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    )
  }
  ```

## Update `pages/index.js`

  ```js
  import Head from 'next/head'
  import Layout, { siteTitle } from '../components/layout'
  import utilStyles from '../styles/utils.module.css'

  export default function Home() {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
      </Layout>
    )
  }
  ```