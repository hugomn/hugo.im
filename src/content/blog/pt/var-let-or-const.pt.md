---
author: Hugo Nogueira
pubDatetime: 2018-08-06T00:00:00.000Z
title: "var, let ou const?"
locale: pt
postSlug: var-let-or-const
featured: false
draft: false
tags:
  - javascript
description: Entendendo as diferenças entre var, let e const no JavaScript ES6, incluindo comportamentos de escopo e quando usar cada declaração de variável.
---

Uma (ou duas) das características mais importantes que vieram com ES2015 (ES6) foi a adição de `let` e `const` que podem ser usados para declaração de variáveis. Mas, a primeira pergunta que você pode ter é: o que as torna diferentes do nosso velho `var`? Se você ainda não está claro sobre isso, este artigo é para você.

Vamos primeiro revisar os pontos mais importantes sobre `var`.

# Declarações Var

Estou assumindo que todos sabemos que `var` é usado para atribuir algum valor a uma variável que pode ser reutilizada mais tarde. O que é importante entender aqui é o escopo onde esse valor será acessível.

# Escopo do Var

`var` são sempre _globalmente_, _função_/_localmente_ escopados. Isso significa que qualquer variável declarada com `var` fora de um bloco de função está disponível para uso em toda a janela. `var` é escopo de função quando é declarado dentro de uma função. Isso significa que está disponível e pode ser acessado apenas dentro dessa função. Vamos ver um exemplo:

```javascript
function foo() {
  var x = 0;
}
console.log(x); // ReferenceError: x is not defined
```

# Escopo de bloco

Um bloco é um pedaço de código delimitado por {}. Um bloco vive em chaves. Qualquer coisa dentro de chaves é um bloco. `var` não é _block-scoped_, então por exemplo:

```javascript
var x = 0;
function foo() {
  var x = 1;
}
console.log(x); // 1
```

`x` ainda estava no "escopo global" dentro do bloco `if`. O valor de `i` foi sobrescrito, o que pode não ter sido a intenção.

# Declaração Let

`let` vem como uma melhoria para declarações `var`. Resolve o exemplo acima, tornando a variável _block-scoped_. Assim como `var`, uma variável declarada com `let` pode ser atualizada dentro de seu escopo. Diferentemente de `var`, uma variável `let` não pode ser re-declarada dentro de seu escopo.

Isso funcionará:

```javascript
let hello = "Oi, amigo!";
hello = "Oi, irmão!";
```

Isso retornará um erro:

```javascript
let hello = "Oi, amigo!";
let hello = "Oi, irmão!";
```

No entanto, se a mesma variável for definida em diferentes escopos, não haverá erro:

```javascript
let x = 0;
if (true) {
  let x = 1;
  console.log(x); // 1
}
console.log(x); // 0, sem erro
```

# Declaração Const

Declarações `const`, como podemos imaginar, são usadas para declarar valores constantes. Como `let`, declarações `const` são _block-scoped_.

Regra geral: declarações `const` nunca podem ser re-declaradas ou reatribuídas. Então, ambos os trechos abaixo falham:

```javascript
const hello = "Oi, amigo!";
hello = "Oi, irmão!";
// erro : Assignment to constant variable.
```

```javascript
const hello = "Oi, amigo!";
const hello = "Oi, irmão!";
// erro : Identifier 'hello' has already been declared
```

Espero que essas adições realmente importantes do ES6 estejam um pouco mais claras agora. Discutirei o _hoisting_ de `var`, `let` e `const` em um post futuro. 🤟