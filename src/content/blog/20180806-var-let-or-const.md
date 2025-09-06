---
author: Hugo Nogueira
pubDatetime: 2018-08-06T00:00:00.000Z
title: "var, let or const?"
locale: en
postSlug: var-let-or-const
featured: false
draft: false
image: /images/20180806.png
tags:
  - javascript
description: Understanding the differences between var, let, and const in JavaScript ES6, including scope behaviors and when to use each variable declaration.
---

One (or two) of the most important features that came with ES2015 (ES6) was  the addition of `let` and `const` which can be used for variable declaration. But, the first question that you may have is: what makes them different from our old `var`? If you are still not clear about this, this article is for you.

Let's first review the most important points about `var`.

# Var declarations

I'm assuming that we all know that `var` is used to assign some value to a variable that can be reused later. What is important to understand here is the scope where that value will be acessible.

# Var scope

`var` are always _globally_,_function_/_locally_ scopped. This means that any variable that is declared with `var` outside a function block is available for use in the whole window. `var` is function scoped when it is declared within a function. This means that it is available and can be accessed only within that function. Let's see one example:

```javascript
function foo() {
  var x = 0;
}
console.log(x); // ReferenceError: x is not defined
```

# Block scope

A block is chunk of code bounded by {}. A block lives in curly braces. Anything within curly braces is a block. `var` is not _block-scoped_, so for example:

```javascript
var x = 0;
function foo() {
  var x = 1;
}
console.log(x); // 1
```

`x` was still in the "global scope" within the `if` block. `i`'s value was overwritten, which may have not been the intention.

# Let declaration

`let` comes as an improvement for `var` declarations. It solves the above example, making the variable _block-scoped_. Just like `var`, a variable declared with `let` can be updated within its scope. Unlike `var`, a `let` variable cannot be re-declared within its scope.

This will work:

```javascript
let hello = "Hi, friend!";
hello = "Hi, brother!";
```

This will return an error:

```javascript
let hello = "Hi, friend!";
let hello = "Hi, brother!";
```

However, if the same variable is defined in different scopes, there will be no error:

```javascript
let x = 0;
if (true) {
  let x = 1;
  console.log(x); // 1
}
console.log(x); // 0, no error
```

# Const declaration

`const` declarations, as we can imagined, are used to declare constant values. Like `let`, `const` declarations are _block-scoped_.

Rule of thumb: `const` declarations can never be re-declared or re-assigned. So, both snippets below fail:

```javascript
const hello = "Hi, friend!";
hello = "Hi, brother!";
// error : Assignment to constant variable.
```

```javascript
const hello = "Hi, friend!";
const hello = "Hi, brother!";
// error : Identifier 'hello' has already been declared
```

I hope these really important ES6 additions is a little bit clearer now. I will discuss `var`, `let` and `const` _hoisting_ in a future post. 🤟