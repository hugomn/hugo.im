---
author: Hugo Nogueira
pubDatetime: 2018-09-26T00:00:00.000Z
title: "How to develop reusable components with Babel and RollupJS"
locale: en
postSlug: how-to-develop-reusable-components-with-babel-and-rollupjs
featured: false
draft: false
image: /images/20180926.jpg
tags:
  - javascript
  - rollup.js
description: A comprehensive guide on creating and publishing reusable JavaScript components using Rollup.js and Babel, including the evolution of JavaScript modules.
---

On October 10th, I have had the pleasure of talking about reusable components using the Rollup.js library, at the meetup [React Open Source](https://www.meetup.com/React-Open-Source/) in Berlin. I tried to show, with a very simple example, the context of creating the concept of modules in JavaScript. I also did a live-coding session, showing how to create and publish reusable components. Watch the full video at the end of this post.

## Why would I need to expose my components?

There are several reasons and examples of situations where it is interesting to create reusable components. It is important to list some of them:

### 1. Sharing components between different applications

This is the most obvious and most common case. The essential idea of ​​component architecture is to create reusable pieces of code. A classic example of reusability is the creation of UI components that can be reused among different applications.

### 2. Sharing configuration

Another fairly common case of reuse happens when we need to share configurations between projects. A simple way to do this is to compile the settings as components.

### 3. Micro-services for front-end applications

The micro-service architecture is a development and deploy technique that relies on services with well-defined and totally disconnected responsibilities, providing system maintenance and scalability. This approach has become common in front-end applications and the use of reusable components is a way of developing micro-services.

## How to manage encapsulation and dependency in JavaScript?

A basic principle for creating independent and reusable components is that they should be encapsulated and that the dependencies are properly managed. To solve this problem, the concept of JavaScript Modules has been introduced.

Initially, immediately executed functions (IIFE) and the "Revelling module" standard for components creation were used, as in the following example:

```javascript
var myRevealingModule = (function () {
  var privateName;

  function privateDisplay() {
    console.log("Name:" + privateName);
  }

  function publicDisplay(name) {
    privateName = name;
    privateDisplay();
  }

  return { display: publicDisplay };
})();

myRevealingModule.display("My JavaScript Module");
```

### CommonJS

In January 2009, however, Kevin Danger started the CommonJS project for better standardization of JavaScript components, especially for server-side scripts. The project was initially called **ServerJS**. The project introduced the concepts of **require**, **exports** and **module**.

But in May 2013, Isaac Z. Schlueter, npm author, said that CommonJS was being discontinued by Node.js, and that it would be avoided by the project maintainers. The following is an example of a module using CommonJS:

```javascript
// commonJs_double.js
module.exports = function (number) {
  return number * 2;
};
```

```javascript
// commonJs_index.js
var double = require("/commonJs_double");

console.log(double(4)); // 8
```

### Asynchronous Module Definition (AMD)

Since the implementation of CommonJS was not compatible with browsers, the definition of asynchronous modules, or AMD, was introduced. AMD was created to be used in browsers to improve applications startup time, and such modules could be objects, functions, constructors, strings, JSON, etc. Here is an example of an AMD module:

```javascript
define(["module1", "module2"], function(module1, module2) {
    // The function is called only when the requested modules
    // are finished loading. The define function takes the first
    // argument as an array of dependency modules. These modules are
    // loaded in a non-blocking manner in the background and once the
    // loading is completed, the callback function is executed.
    module1.someMethod();
}
```

### ES2015 Modules

ES2015 modules have been implemented in the recent ECMAScript 2015 implementation of Javascript, and are compatible with the **asynchronous** and **synchronous** approaches. And it has one great advantage: **it's native JavaScript! 🤩**. However it is not completely available in all browsers and for this you need a **transpiler** like **Babel** for example.

```javascript
// es2015_square.js
export function square(x) {
  return x * x;
}
```

```javascript
// es2015_index.js
import { square } from "es2015_square";

console.log(square(11)); // 121
```

Now that we've seen a quick introduction to JavaScript modules, let's understand how **Rollup.js** can help us compile our components into reusable components.

## What is Rollup.js?

Rollup is a module bundler for JavaScript libraries that compiles small pieces of code into something larger and more complex, such as a library or an application.

You must be asking yourself? **Why not Webpack?** Webpack was basically created as a bundler for web applications, mainly to solve code-splitting and asset management issues. Recently both libraries have grown a lot and are able to solve most of the problems, both for libraries, and for web applications. However, conventional wisdow among bundlers has been this:

> For complex web applications, use **Webpack**. For libraries, use **Rollup**.

## Talk is cheap, show me the code

Let's finally see a real example. I will use an extremely basic **React** component. We'll create a **Header**, and compile it for reuse on external projects!

#### 1. First, we need to install Rollup.js globally

```shell
npm install --global rollup
```

#### 2. Now, we create our basic header component

Our component will only have a tag **h1**, and will be published in npm so it can be used by other projects:

```javascript
// src/header.js
import React from "react";

const Header = function () {
  return <h1>Hello, DV!</h1>;
};

export default Header;
```

#### 3. We need to export our Header component

```javascript
// src/main.js
import Header from "./header.js";

export default Header;
```

Since we intend to use ES6 modules, we will need to install and configure **Babel** so that our component is correctly compiled.

#### 4. Installing and configuring Babel

```shell
npm install --save-dev @babel/core @babel/cli @babel/present-env @babel/present-react
```

```javascript
// babel.config.js
const presets = [
  [
    "@babel/env",
    {
      modules: false,
    },
  ],
  ["@babel/preset-react"],
];

module.exports = { presets };
```

Now that we have installed and configured Babel, we need to install the **Rollup.js** plugin that will integrate with **Babel**:

#### 5. Installing Rollup.js Babel plugin

```shell
npm install --save-dev rollup-plugin-babel
```

```javascript
// rollup.config.js
import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/main.js",
    output: {
      name: "reusableComponents",
      file: "dist/main.js",
      format: "iife",
    },
    external: ["react"],
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
    ],
  },
];
```

It's super important to note the line **external: ["react"]**
Without this configuration, Rollup will compile the entire React source code along with your library.

Now we can already compile our component:

```shell
rollup -c
```

After compiled, your library will be compiled and available at **dist/main.js**. As a final step, we just need to publish your component to npm repository so that it can be used by other projects.

#### 6. Publishing your library in ppm

Before publishing your library, you need to be logged in to npm, and you will probably need to set up the SSH keys in your account.

```shell
npm login
```

```shell
npm publish --access=public
```

Ready! Once published, your library and its components will now be available via `npm install` on your other projects. 🎉

#### 7. **Bonus Tip:** Using `npm link` to configure your development environment

To avoid having to publish and update your component every time you make a change, there is a simple way to reference your component locally in your projects.

1. In your library, create a virtual link using the `npm link` command.
2. In the project that uses your library, run the same command, now referencing the library, for example: `npm link @hugomn/reusable-components`.

We're ready! Now you have a complete and simple environment to develop your reusable components. I hope you enjoy it and please send me any questions or feedback you have. 🤘🏻

## Watch the full video

Below are the slides and the full video of the talk.

<div class="container" style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 40px"><iframe src="https://www.youtube.com/embed/Dve_bYaAVZ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.1987%;"><iframe src="//speakerdeck.com/player/95ae0fbc24be49d88f1a7a0b333e984f" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no"></iframe></div>
