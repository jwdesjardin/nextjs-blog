---
title: Typescript Docs Notes
date: "2020-12-14"
description: "Notes from the Typescript Docs."
tags: ["Typescript"]
---

## Typescript documentation notes

Types will be infered 

```js
let helloWorld = "Hello World";
//  ^ = let helloWorld: string
```

You can declare the shape of a javascript object

```js
interface User {
  name: string;
  id: number;
}
```

You can annotate parameters and return value to functions 


```js
function getAdminUser(): User {
  //...
}

function deleteUser(user: User) {
  // ...
}
```

Javascript native primitive types:
 - boolean 
 - bigint 
 - null
 - number 
 - string 
 - symbol 
 - object
 - undefined

 Types added by javascript
 - any returns any type
 - void returns undefined
 - never
 - unknown


## Types

> You should prefer **interface**. Use **type** when you need specific features.

### Unions

simple example: a boolean can be either true or false;

```js
type MyBool = true | false;
```

> A popular use-case for union types is to describe the set of strings or numbers literal that a value is allowed to be:

```js
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

For a functon that excepts different types a string or an array
```js
function getLength(obj: string | string[]) {
  return obj.length;
}
```

Use typeof to determine  type
- typeof s === "string"
- typeof n === "number"
- typeof b === "boolean"
- typeof undefined === "undefined"
- typeof f === "function"
- Array.isArray(a)

### Generics used with types

```js
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```
common way to declare arrays

decalring your own types that use generics: 

```js
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
```

## structural type system 

typescript checks types based on the shape given. So an object with the shape will pass even if it is not declared at being the same type.



