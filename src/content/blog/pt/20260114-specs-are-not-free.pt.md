---
author: Hugo Nogueira
pubDatetime: 2026-01-14T10:00:00.000Z
title: "Specs Não São de Graça: Por Que a IA Não Vai Substituir a Programação (Mas Vai Transformá-la)"
locale: pt
postSlug: specs-are-not-free
featured: true
draft: false
tags:
  - agentes-ia
  - programacao
  - engenharia-de-software
  - ia
  - futuro-do-trabalho
description: Uma resposta à tese viral "spec as code". Não paramos de programar - mudamos o que programar significa. E essa mudança exige mais fundamentos de engenharia, não menos.
keywords: Hugo Nogueira, agentes IA, spec as code, programação, engenharia de software, Matthias Georgi, vibe coding, codificação IA, futuro da programação
image: "/images/blog/specs-are-not-free.jpg"
---

O post do Matthias Georgi sobre ["2026 ser o ano em que vamos parar de escrever código"](https://www.linkedin.com/feed/update/urn:li:activity:7417153311512100864/) chamou minha atenção hoje. Cristalizou algo que venho vendo de perto enquanto construo agentes autônomos e infraestrutura de agentes no último ano.

A tese dele é clara: estamos migrando de "code as spec" para "spec as code". Em vez de escrever detalhes de implementação, vamos escrever especificações e deixar a IA gerar o código. A especificação se torna a fonte da verdade. É uma visão convincente, e acho que está direcionalmente correta.

A possível leitura errada é acreditar que essa mudança torna programar mais fácil. Que specs são de alguma forma de graça. Que finalmente podemos pular as partes difíceis. **Não podemos, e isso é na verdade uma boa notícia.**

## A Ilusão da Spec

O futuro onde escrevemos specs em vez de código é real, mas uma boa spec é a destilação do julgamento de engenharia. Ela codifica entendimento de casos extremos, características de performance, modos de falha, fronteiras de segurança e restrições de integração.

Em outras palavras, **requer saber programar**, não apenas digitar sintaxe, mas **pensar como engenheiro**.

Considere a spec aparentemente simples: "Construa um sistema de autenticação de usuários."

Um júnior lê isso e imagina um formulário de login. Um sênior lê isso e imediatamente considera algoritmos de hash, rotação de tokens de sessão, rate limiting, fluxos de recuperação de conta, provedores OAuth, logging e alertas, e requisitos regulatórios como LGPD. A IA não faz a diferença entre esses dois desaparecer. Ela faz a diferença importar mais.

A spec não é a parte fácil. A spec é a parte que costumávamos esconder dentro dos detalhes de implementação. Ela se torna visível agora, e isso é saudável para o ofício.

## Vibe Coding vs Engenharia

Tem um termo circulando por aí: "vibe coding". Entrega rápido, deixa a IA resolver, itera até funcionar. Para protótipos, isso é genuinamente poderoso. Construí coisas em horas que teriam levado dias. A velocidade criativa é real.

Mas eis o que aprendi ao colocar agentes de IA em produção: vibe coding cria sistemas que funcionam até não funcionarem mais, e quando falham, falham de formas quase impossíveis de debugar porque não há entendimento compartilhado do sistema. A IA produziu código que passou nos testes, mas escondeu comportamento O(n²) em helpers, engoliu erros, vazou memória em casos extremos, ou introduziu race conditions que só aparecem sob tráfego real.

> Vibe coding é prototipagem. Engenharia é o que você faz quando precisa funcionar às 3 da manhã quando você não está lá.

## Contexto É um Ecossistema

O segundo insight que o post do Matthias provocou é que contexto é muito maior do que admitimos. A maioria das discussões foca em "janelas de contexto": quanto texto conseguimos alimentar a IA. Mas contexto real de software não vive em um arquivo. **Contexto é um ecossistema.**

Sistemas vivem no histórico do Git, em threads do Slack que debatem tradeoffs, em dashboards de monitoramento que mostram o que usuários fazem versus o que você esperava, em relatórios de incidentes que documentam modos de falha, e em conhecimento tribal que ninguém nunca escreveu. Nenhuma spec captura tudo isso. Nenhuma janela de contexto é grande o suficiente.

Engenheiros que prosperam nesse novo ambiente não são os que escrevem prompts espertos, mas os que entendem qual contexto importa, como estruturá-lo, e como alimentá-lo no sistema. É por isso que gosto do termo "engenharia de contexto". É documentação tornada acionável, arquitetura tornada legível, e conhecimento tornado computável.

## O Que a Programação Se Torna

Se a IA cuida da implementação, o que sobra para programadores fazerem?

**Nos tornamos designers de sistemas.** Definimos fronteiras, contratos e interfaces. Decidimos quais componentes existem e como se comunicam.

**Nos tornamos engenheiros de falhas.** Antecipamos o que pode dar errado, não olhando para sintaxe, mas imaginando cenários adversários, caminhos de recuperação e restrições. Isso requer julgamento, que não vem de dados de treinamento.

**Nos tornamos arquitetos de contexto.** Estruturamos conhecimento de sistemas para que tanto humanos quanto IA possam navegá-lo. Construímos o andaime que faz "spec as code" funcionar.

**Nos tornamos operadores de IA.** Avaliamos os resultados, ajustamos restrições, e lidamos com as situações onde a IA gera algo errado com confiança. Isso não é menos programação. É programação num nível mais alto de abstração.

## A Mudança Real

Eis onde Matthias está exatamente certo: a fonte da verdade está mudando. Costumávamos escrever código e derivar comportamento dele. Agora escrevemos especificações e derivamos código delas. Mas uma spec não é uma lista de desejos em linguagem natural. Uma boa spec é precisa, completa, testável, e fundamentada em princípios de engenharia.

> Não paramos de programar. Mudamos o que programar significa.

A mudança favorece engenheiros que entendem estruturas de dados, design de sistemas, características de performance, modos de falha e segurança. As coisas que pareciam acadêmicas quando você podia simplesmente pesquisar a sintaxe no Google.

A IA sabe a sintaxe. Ela leu todas as respostas do Stack Overflow. O que ela não sabe é o que importa no seu sistema específico, e o que "funcionando" significa no seu contexto específico. Isso ainda é seu trabalho, e é o trabalho que sempre foi difícil.

## A Oportunidade

Não estou pessimista com essa mudança. Estou energizado por ela. Por anos, criação de software foi gargalada pela implementação. Ideias brilhantes morreram porque digitar o código levava tempo demais. A IA comprime essa lacuna, e isso libera engenheiros para gastar mais tempo em concepção, design e correção.

Os engenheiros que vão prosperar são os que conseguem pensar claramente sobre sistemas, especificar precisamente o que querem, avaliar criticamente o que recebem, e iterar rapidamente em direção à correção.

Essas sempre foram as verdadeiras habilidades de engenharia. Só as praticávamos enquanto digitávamos ponto e vírgula.

Agora as praticamos diretamente.

---

_Qual sua experiência com desenvolvimento assistido por IA? Estou curioso se você está achando que exige mais julgamento de engenharia ou menos. Me encontre no [X](https://x.com/hugomn) ou [LinkedIn](https://linkedin.com/in/hugomn)._
