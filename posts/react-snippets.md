---
title: React Snippets
date: "2020-12-13"
description: "Snippets of react code that I want to save"
tags: ["React","React-Bootstrap"]
---


# Diabling a button if a prop value is 0:

```js
<Button className='btn-block' type='button' disabled={product.countInStock === 0}>
  Add to Cart
</Button>
```



# default props and propTypes

```js 
Rating.defaultProps = {
	color: '#f8e825'
};

Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string
};
```

## Format Date

1. add date component to ``` /components/date.js ```

```js 
import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
```

2. Use it

```js
import Date from '../../components/date'

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}

      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />

      {/* Keep the existing code here */}
    </Layout>
  )
}
```




