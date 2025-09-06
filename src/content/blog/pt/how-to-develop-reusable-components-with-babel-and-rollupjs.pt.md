---
author: Hugo Nogueira
pubDatetime: 2018-09-26T00:00:00.000Z
title: "Como desenvolver componentes reutilizáveis utilizando Babel and RollupJS"
locale: pt
postSlug: how-to-develop-reusable-components-with-babel-and-rollupjs
featured: false
draft: false
ogImage: /images/20180926.jpg
tags:
  - javascript
  - rollup.js
description: Um guia completo sobre criação e publicação de componentes JavaScript reutilizáveis usando Rollup.js e Babel, incluindo a evolução dos módulos JavaScript.
---

No dia 10 de Outubro, tive o prazer de falar sobre componentes reutilizáveis utilizando a biblioteca Rollup.js, no meetup [React Open Source](https://www.meetup.com/React-Open-Source/), em Berlin. Tentei mostrar, de forma simples, o contexto da criação do conceito de módulos em JavaScript e fiz uma sessão de live coding, mostrando como criar e publicar componentes reutilizáveis. Assista ao vídeo completo no final desse post.

## Por que eu precisaria expor meus componentes?
Existem diversos motivos e exemplos de situações em que é interessante criarmos componentes reutilizáveis. É importante listarmos alguns deles:

### 1. Compartilhamento de componentes entre diferentes aplicações
Esse é o caso mais óbvio e mais comum. A ideia essencial da arquitetura de componentes é criar partes reutilizáveis de código. Um exemplo clássico de reutilização é a criação de componentes de UI que podem ser reutilizados em diferentes aplicações.

### 2. Compartilhamento de configuração
Um outro caso bastante comum de reutilização acontece quando precisamos compartilhar configurações entre projetos. Uma forma simples de fazer isso é compilar as configurações como componentes.

### 3. Criação de micro-services para aplicações front-end
A arquitetura de micro-serviços é uma técnica de desenvolvimento e deploy que utiliza serviços com responsabilidades bem definidas e totalmente desacordados, facilitando a manutenção e evolução do sistema. Essa abordagem tem se tornado comum em aplicações front-end e a utilização de componentes reutilizáveis é uma forma de desenvolver micro-services.

## Como gerenciar encapsulamento e dependência em JavaScript?
Um princípio básico para a criação de componentes independentes e reutilizáveis é que os mesmos sejam encapsulados e que haja um bom gerenciamento de dependências. Para resolver esse problema, foi introduzido o conceito de módulos JavaScript. 

Inicialmente, eram utilizadas funções imediatamente executadas (IIFE) e o padrão "Revelling module" para a criação de componentes, como no exemplo a seguir:

```javascript
var myRevealingModule = (function () {
        var privateName;
 
        function privateDisplay() {
            console.log("Name:" + privateName);
        }
 
        function publicDisplay( name ) {
            privateName = name;
            privateDisplay();
        }
 
        return { display: publicDisplay };
    })();
 
myRevealingModule.display("My JavaScript Module");
```

### CommonJS

Em Janeiro de 2009, porém, Kevin Danger iniciou o projeto de criação do CommonJS para que houvesse uma melhor padronização de componentes JavaScript, principalmente para *scripts server-side*. O projeto foi inicialmente chamado de **ServerJS**. O projeto iniciou os conceitos de **require**, **exports** and **module**.

Porém em Maio de 2013, Isaac Z. Schlueter, autor do npm, gerenciador de pacotes do Node.js, disse que CommonJS estava sendo descontinuado pelo Node.js, e que seria evitado pelos mantenedores do projeto. Segue abaixo um exemplo de módulo utilizando CommonJS:

```javascript
// commonJs_double.js
module.exports = function(number) {
  return number * 2; 
}
```

```javascript
// commonJs_index.js
var double = require('/commonJs_double');

console.log(double(4)); // 8
```

### Asynchronous Module Definition (AMD)

Como a implementação de CommonJS não era compatível com os browsers, foi criada a definição de módulos assíncronos, ou AMD. A AMD foi criada para ser usada nos browsers para melhorar o tempo de startup das aplicações, e tais módulos poderiam ser objetos, funções, construtores, strings, JSON, etc. Abaixo um exemplo de módulo AMD:

```javascript
define(["module1", "module2"], function(module1, module2) {
    // A função é chamada apenas quando os módulos solicitados
    // terminam de carregar. A função define recebe o primeiro
    // argumento como um array de módulos de dependência. Esses módulos são
    // carregados de forma não-bloqueante em segundo plano e uma vez que o
    // carregamento é concluído, a função de callback é executada.
    module1.someMethod();
});
```

### Módulos ES2015 

Os módulos ES2015 foram implementados na recente implementação ECMAScript 2015 do Javascript, e é compatível com as abordagens **assíncrona** e **síncrona**. E tem uma grande vantagem: **é JavaScript nativo! 🤩**. Porém não está completamente disponível em todos os browsers e para isso precisa de um **transpilador** como **Babel** por exemplo para a execução em browsers não suportados.

```javascript
// es2015_square.js
export function square(x) {
    return x * x; 
}
```

```javascript
// es2015_index.js
import { square } from 'es2015_square';

console.log(square(11)); // 121
```

Agora que vimos uma rápida introdução aos módulos em JavaScript, vamos entender como **Rollup.js** pode nos ajudar a compilar nossos componentes em componentes reutilizáveis.

## O que é Rollup.js?
Rollup é um *bundler* de módulos para JavaScript que compila partes pequenas de código em algo maior e mais complexo, como uma biblioteca ou uma aplicação. 

Você deve estar se perguntando? **Por que não Webpack?** Webpack foi criado basicamente como um *bundler* para web applications, principalmente para resolver os problemas de *code-splitting* e gerenciamento de assets. Recentemente ambas biblioteca cresceram muito e são capazes de resolver a maioria dos problemas, tanto para bibliotecas, quando para web applications. Porém, o senso comum entre os *bundlers* tem sido o seguinte:

> Para aplicações completas, utilize **Webpack**. Para bibliotecas, utilize **Rollup.js**.

## Talk is cheap, show me the code
Vamos finalmente ao nosso exemplo. Nesse exemplo, irei utilizar um componente extremamente básico em **React**. Criaremos um **Header**, e o compilaremos para que seja reutilizado em outros projetos! 

#### 1. Primeiro, instalamos Rollup.js globalmente

```shell
npm install --global rollup
```

#### 2. Agora, criamos nosso componente de cabeçalho básico
Nosso componente terá apenas uma tag **<h1>**, e será publicado no npm para que possa ser utilizado por outros projetos:

```javascript
// src/header.js
import React from "react";

const Header = function() {
  return <h1>Hello, DV!</h1>;
};

export default Header;
```

#### 3. Precisamos exportar nosso componente de Cabeçalho

```javascript
// src/main.js
import Header from "./header.js";

export default Header;
```

Como pretendemos utilizar módulos ES6, precisaremos instalar e configurar o **Babel** para que nosso componente seja corretamente compilado.

#### 4. Instalando e configurando o Babel

```shell
npm install --save-dev @babel/core @babel/cli @babel/present-env @babel/present-react
```

```javascript
// babel.config.js
const presets = [
  [
    "@babel/env",
    {
      modules: false
    }
  ],
  ["@babel/preset-react"]
];

module.exports = { presets };
```

Agora que já instalamos e configuramos o Babel, precisamos instalar o plugin para o **Rollup.js** que fará a integração com **Babel**:

#### 5. Instalando o plugin do Babel para o Rollup.js

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
      format: "iife"
    },
    external: ["react"],
    plugins: [
      babel({
        exclude: "node_modules/**"
      })
    ]
  }
];
```

Muita atenção na linha **external: ["react"]**. Sem essa configuração, o Rollup irá compilar todo o código-fonte do React junto com seu componente.

Agora já podemos compilar nosso componente:

```shell
rollup -c
```

Após compilado, seu biblioteca estará compilada e disponível em **dist/main.js**. Como etapa final, precisamos apenas publicar seu componente no repositório do npm, para que possa ser utilizado por outros projetos. 

#### 6. Publicando sua biblioteca no ppm

Antes de publicar sua biblioteca, você precisa ser logar no npm, e provavelmente precisará configurar as chaves SSH de sua conta. 

```shell
npm login
```

```shell
npm publish --access=public
```

Pronto! Após publicado, sua biblioteca e seus componentes já estarão disponíveis para serem usados via `npm install` em seus outros projetos. 🎉

#### 7. **Dica bônus:** Usando `npm link` para configurar seu ambiente de desenvolvimento

Para evitar que você tenha que publicar e atualizar seu componente toda vez que fizer alguma alteração, existe uma forma simples de referenciar seu componente localmente em seus projetos. 

1. Em sua biblioteca, crie um link virtual utilizando o commando `npm link`.
2. No projeto que utiliza sua biblioteca, execute o mesmo comando, agora referenciando a biblioteca, por exemplo: `npm link @hugomn/reusable-components`.

Pronto! Agora você tem um ambiente completo e simples para desenvolver seus componentes reutilizáveis. Espero que gostem e, por favor, enviem qualquer dúvida ou feedback que tiverem. 🤘🏻

## Vídeo completo no YouTube
Abaixo estão o vídeo completo e os slides da apresentação que fiz (em inglês) para o meetup React Open Source, no dia 10 de outubro de 2018, em Berlim.

<div class="container" style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 40px"><iframe src="https://www.youtube.com/embed/Dve_bYaAVZ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.1987%;"><iframe src="//speakerdeck.com/player/95ae0fbc24be49d88f1a7a0b333e984f" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no"></iframe></div>