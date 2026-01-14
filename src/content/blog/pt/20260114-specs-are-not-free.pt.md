---
author: Hugo Nogueira
pubDatetime: 2026-01-14T21:00:00.000Z
title: "Specs Não São de Graça: Por Que a IA Não Vai Substituir a Programação (Vai Transformá-la)"
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
description: Uma resposta à tese viral "spec as code". Não paramos de programar—mudamos o que programar significa. E essa mudança exige mais fundamentos de engenharia, não menos.
keywords: Hugo Nogueira, agentes IA, spec as code, programação, engenharia de software, Matthias Georgi, vibe coding, codificação IA, futuro da programação
image: "/images/blog/specs-are-not-free.jpg"
---

O post do Matthias Georgi ["Spec as Code"](https://www.georgi.io/blog/spec-as-code) viralizou essa semana, e cristalizou algo que venho pensando há meses.

A tese dele: estamos migrando de "code as spec" para "spec as code". Em vez de escrever detalhes de implementação, vamos escrever especificações e deixar a IA gerar o código. A spec se torna a fonte da verdade.

É uma visão convincente. E acho que está direcionalmente correta.

Mas há uma leitura perigosa escondida por baixo: que isso significa que programar fica mais fácil. Que specs são de alguma forma "de graça". Que finalmente podemos pular as partes difíceis.

**Não podemos. E é por isso que isso é na verdade uma boa notícia.**

## A Ilusão da Spec

Eis o que o futuro "spec as code" realmente exige:

Para escrever uma spec que uma IA possa implementar de forma confiável, você precisa entender:
- Quais casos extremos existem
- Quais modos de falha são possíveis
- Quais características de performance importam
- Quais fronteiras de segurança são necessárias
- Como componentes interagem em escala

Em outras palavras: **você precisa saber programar.**

Não digitar sintaxe. *Pensar* como engenheiro.

A spec não é de graça. A spec é a destilação do julgamento de engenharia. É a parte que sempre foi difícil—só que antes a escondíamos dentro dos detalhes de implementação.

Considere esta spec "simples": "Construa um sistema de autenticação de usuários."

Um engenheiro experiente lê isso e imediatamente pensa:
- Algoritmos de hash de senha e gerenciamento de salt
- Geração e rotação de tokens de sessão
- Rate limiting e proteção contra força bruta
- Fluxos de recuperação de conta
- Padrões de integração OAuth
- Conformidade com LGPD para dados de usuário

Um engenheiro júnior lê e pensa: "Legal, vou adicionar um formulário de login."

**A IA não faz a diferença entre esses dois desaparecer. Ela faz a diferença importar mais.**

## Vibe Coding vs. Engenharia

Tem um termo circulando por aí: "vibe coding". Entrega rápido, deixa a IA resolver, itera até funcionar.

Para protótipos e MVPs, isso é genuinamente poderoso. Construí coisas em horas que teriam levado dias. A velocidade criativa é real.

Mas eis o que aprendi construindo agentes de IA em produção: vibe coding cria sistemas que funcionam até não funcionarem mais. E quando falham, falham de formas quase impossíveis de debugar—porque ninguém realmente entende o que o sistema está fazendo.

A IA gerou código que "funciona" mas:
- Tem complexidade O(n²) escondida numa função auxiliar
- Engole erros silenciosamente que vão aparecer em produção
- Cria race conditions que aparecem uma vez a cada 1000 requisições
- Vaza memória em casos extremos que os testes não cobrem

**Vibe coding é prototipagem. Engenharia é o que acontece quando você precisa que funcione às 3 da manhã quando você não está lá.**

## Contexto É um Ecossistema

Eis o segundo insight que o post do Matthias provocou: o problema de contexto é maior do que pensamos.

A conversa atual foca em "janelas de contexto"—quanto texto você consegue alimentar a IA? Mas contexto não é um arquivo. **Contexto é um ecossistema.**

Software real existe em:
- Histórico do Git e as decisões embutidas nele
- Conversas no Slack sobre por que escolhemos a abordagem A em vez da B
- Métricas de produção que revelam padrões reais de uso
- Relatórios de incidentes que documentam modos de falha
- Conhecimento tribal que nunca foi documentado

Nenhuma spec captura isso. Nenhuma janela de contexto é grande o suficiente.

Os engenheiros que vão prosperar na era da IA não serão os que escrevem os melhores prompts. Serão os que entendem seus sistemas profundamente o suficiente para saber qual contexto importa—e como estruturá-lo para que a IA possa realmente usá-lo.

É por isso que estou otimista com o que chamo de "engenharia de contexto": a disciplina de organizar conhecimento de sistemas para que tanto humanos quanto IA possam navegá-lo efetivamente. É documentação, mas turbinada. Arquitetura, mas legível.

## O Que a Programação Se Torna

Então se a IA cuida da implementação, o que programadores realmente fazem?

**Nos tornamos designers de sistemas.** Definimos fronteiras, interfaces e contratos. Decidimos quais componentes existem e como se comunicam.

**Nos tornamos engenheiros de falhas.** Antecipamos o que pode dar errado e especificamos como o sistema deve responder. Esta é a parte que a IA não consegue fazer—porque requer imaginar cenários que não estão nos dados de treinamento.

**Nos tornamos arquitetos de contexto.** Estruturamos conhecimento para que a IA seja efetiva. Construímos o andaime que faz "spec as code" realmente funcionar.

**Nos tornamos operadores de IA.** Monitoramos, ajustamos e corrigimos o curso. Lidamos com os casos onde a IA gera algo errado com confiança.

Isso não é menos programação. É programação num nível mais alto de abstração—o que historicamente sempre exigiu *mais* habilidade, não menos.

## A Mudança Real

Eis o que acho que o Matthias acertou em cheio: a fonte da verdade está mudando.

Antes escrevíamos código e derivávamos comportamento dele. Agora vamos cada vez mais escrever especificações e derivar código delas.

Mas especificações não são listas de desejos em linguagem natural. Boas specs são precisas, completas e testáveis. Elas codificam julgamento de engenharia numa sintaxe diferente.

**Não paramos de programar. Mudamos o que programar significa.**

E essa mudança favorece engenheiros que entendem fundamentos: estruturas de dados, design de sistemas, modos de falha, características de performance, fronteiras de segurança. As coisas que pareciam "acadêmicas" quando você podia simplesmente procurar a sintaxe.

A IA sabe a sintaxe. A IA leu todas as respostas do Stack Overflow.

A IA não conhece o *seu* sistema. A IA não sabe o que importa. A IA não sabe o que "funcionando" significa no seu contexto específico.

Isso ainda é seu trabalho. E é o trabalho que sempre foi difícil.

## A Oportunidade

Não estou pessimista com essa mudança. Estou energizado por ela.

Por anos, programação foi gargalada por detalhes de implementação. Designs de sistemas brilhantes nunca foram construídos porque digitar o código levava tempo demais. Ideias criativas morriam na lacuna entre concepção e execução.

A IA fecha essa lacuna. Mas não elimina a necessidade de concepção. Ela a amplifica.

Os engenheiros que vão prosperar são os que conseguem:
1. Pensar claramente sobre sistemas
2. Especificar precisamente o que querem
3. Avaliar criticamente o que recebem
4. Iterar rapidamente em direção à correção

Essas são habilidades de engenharia. Sempre foram. Só que antes as praticávamos enquanto digitávamos ponto e vírgula.

Agora as praticamos diretamente.

---

*A spec não é de graça. Mas para engenheiros que entendem o que estão construindo, a spec finalmente é suficiente.*

---

*Qual sua experiência com desenvolvimento assistido por IA? Estou curioso se você está achando que exige mais julgamento de engenharia ou menos. Me encontre no [X](https://x.com/hugomn) ou [LinkedIn](https://linkedin.com/in/hugomn).*
