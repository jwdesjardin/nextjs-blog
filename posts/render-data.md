---
title: Options for rendering Html
date: "2020-12-12T21:53:03.284Z"
description: "Takes us through pros and cons for Static Site Generating, Server Side Rendering, and Client Side Rendering"
tags: ["Next.js"]
---


## Two Forms of Pre-rendering

  Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in __when__ it generates the HTML for a page.


  - Static Generation is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then *reused* on each request.
  - Server-side Rendering is the pre-rendering method that generates the HTML on **each request**.

#### Examples for Static Rendering
  - Marketing page
  - Blog Posts
  - E-commerce product listings
  - documentation

  These are all things that do not change often and therfore make them good candiates for static generation

  The **pros** of static generation are that it is faster to access these pages. 

  The **cons** are that the page cannot be updated with new data without being rebuilt

#### Examples for Server-side Rendering
  - Twitter
  - Reddit    
  - Forums
  - social networks

  The **pros** of Server-side rendering is that data is up to date and pages will run without js. Good SEO. Good speed.  

  The **cons** are that it takes mroe effort than static to render

#### Examples for Client-side rendering
  - Admin panels
  - Private Routes

The **pros** of Client-side rendering is that data is real-time updated on screen. quick client side navigation. 

The **cons** are that it takes a little more time than SSR on the first render. Bad SEO. No data without JS.