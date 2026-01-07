---
author: Hugo Nogueira
pubDatetime: 2026-01-08T08:00:00.000Z
title: "O Agent Harness: Por Que 2026 é Sobre Infraestrutura, Não Inteligência"
locale: pt
postSlug: agent-harness-infrastructure
featured: true
draft: false
tags:
  - ai-agents
  - autonomous-systems
  - infrastructure
  - ai
  - engineering
description: Inteligência sem infraestrutura é apenas uma demo. Veja por que a tese do Agent Harness importa e o que aprendi construindo agentes autônomos que realmente funcionam.
keywords: Hugo Nogueira, AI agents, agent harness, Phil Schmid, Harrison Chase, LangChain, agentes autônomos, infraestrutura de IA, context engineering
image: "/images/blog/agent-harness-infrastructure.jpg"
---

Dois dias atrás, Philipp Schmid lançou uma tese que me fez parar de scrollar: ["Se 2025 foi o início dos agentes, 2026 será sobre Agent Harnesses."](https://www.philschmid.de/agent-harness-2026)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If 2025 was the beginning of agents, 2026 will be around Agent Harnesses.<br><br>An Agent Harness is the infrastructure that wraps around a model to manage long-running tasks. It provides prompt presets, opinionated handling for tool calls, lifecycle hooks, and ready-to-use… <a href="https://t.co/abc123">pic.twitter.com/abc123</a></p>&mdash; Philipp Schmid (@_philschmid) <a href="https://x.com/_philschmid/status/2008175408923959574">January 5, 2026</a></blockquote>

Estou construindo agentes autônomos há mais de um ano. Primeiro para minha empresa, depois para minha vida pessoal. E ler o [post do Phil](https://www.philschmid.de/agent-harness-2026) foi como se alguém finalmente desse um nome ao que eu vinha enfrentando nas trincheiras.

O insight não é que precisamos de modelos mais inteligentes. Já temos esses. O insight é que **inteligência sem infraestrutura é apenas uma demo**.

## O Que é um Agent Harness?

Phil define de forma elegante: um Agent Harness é a infraestrutura que envolve um modelo de IA para gerenciar tarefas de longa duração. Ele fornece presets de prompts, tratamento opinativo para chamadas de ferramentas, hooks de ciclo de vida e capacidades prontas para uso como planejamento, acesso ao sistema de arquivos e gerenciamento de sub-agentes.

Pense assim: **o Agent Harness é o Sistema Operacional. O LLM é apenas a CPU.**

Harrison Chase, da LangChain, recentemente formalizou isso em uma taxonomia que fez muito sentido para mim:

- **Framework** (LangChain): Os blocos de construção—como você conecta modelos a ferramentas
- **Runtime** (LangGraph): O motor de execução—execução durável, streaming, human-in-the-loop
- **Harness** (DeepAgents): A camada opinativa—prompts, planejamento, acesso ao sistema de arquivos já integrados

A analogia dele: Runtime é Node.js, Framework é Express, Harness é Next.js.

Se você já tentou levar um agente de "demo legal" para "roda de forma confiável em produção", você sabe exatamente por que essa distinção importa.

## O Problema Que Ninguém Fala

Aqui está o que aprendi da forma difícil: **agentes não falham porque não são inteligentes o suficiente. Eles falham porque não conseguem lembrar o que estavam fazendo.**

Uma tarefa típica de agente requer cerca de 50 chamadas de ferramentas. Algumas das minhas chegam a centenas. E em algum lugar por volta da 30ª ou 40ª chamada, as coisas começam a degradar. A janela de contexto enche. A sumarização entra em ação. E de repente seu agente "esquece" detalhes cruciais do início da tarefa.

Eu chamo isso de **Problema da 100ª Chamada de Ferramenta**.

A Anthropic publicou recentemente sua abordagem para isso: um agente inicializador que configura o ambiente na primeira execução, e um agente de código que faz progresso incremental em cada sessão enquanto deixa artefatos claros para a próxima sessão. Eles chamam de "durabilidade de contexto."

Este é o verdadeiro desafio de engenharia de 2026. Não prompt engineering. **Context engineering.**

## Como Isso Realmente Funciona

Deixa eu mostrar o que quero dizer. Tenho vários agentes autônomos rodando partes da minha vida e trabalho agora. Não chatbots com quem eu converso. Agentes que agem enquanto eu durmo.

### Sentinel: O Guardião do Código

<!-- TODO: Adicionar screenshot do PR do Sentinel -->

Este agente monitora minha base de código em busca de warnings e erros. Quando encontra algo, ele não apenas me alerta—ele abre um PR com a correção. Eu acordo com problemas resolvidos, não notificações.

### Hopper: O Especialista em Enterprise

<!-- TODO: Adicionar screenshot da review do Hopper -->

Na minha empresa, construímos um agente que revisa PRs por mais do que qualidade de código. Ele verifica se o texto está alinhado com como nossos usuários realmente falam—CISOs, gerentes de compliance, equipes de segurança. Ele pega quando acidentalmente escrevemos como engenheiros em vez de escrever para nossos clientes.

### Coach de Saúde da Stella: O Momento Que Mudou Tudo

<!-- TODO: Adicionar screenshot da mensagem de febre da Stella -->

Minha filha Stella tem um agente de monitoramento de saúde. Mês passado, ela desenvolveu febre. Enquanto minha esposa e eu já estávamos no hospital com ela, o agente notou o pico de temperatura nos dados registrados e nos enviou uma mensagem: preocupado, carinhoso, pedindo para respondermos com um emoji para saber que estávamos bem.

Leia de novo. **Um agente entrou em contato para ver se estávamos bem durante uma emergência de saúde familiar.** Não porque eu o acionei. Porque ele foi projetado para se importar.

Isso não é um chatbot. Isso não é um workflow. Isso é um agente.

### Meu Coach de Saúde Pessoal

<!-- TODO: Adicionar screenshot da mensagem do coach de saúde -->

Estou em fase de cutting agora, e tenho lesões antigas no joelho e ombro que limitam certos exercícios. Meu agente coach de saúde sabe disso. Ele adapta minhas recomendações de treino, me avisa quando estou forçando demais e me mantém motivado—tudo enquanto respeita minhas limitações.

## A Infraestrutura Que Torna Isso Possível

Nada disso funciona sem a infraestrutura certa. Aqui está o que aprendi que importa:

### 1. Execução Durável

Agentes precisam sobreviver a falhas. Quedas de rede, timeouts de API, reinícios de servidor—seu agente não pode perder seu estado toda vez que algo dá problema. É por isso que tecnologias como Temporal importam. Seu agente precisa de checkpointing, recuperação e a capacidade de retomar exatamente de onde parou.

### 2. Arquitetura de Memória

Memória de curto prazo (a janela de contexto) não é suficiente. Você precisa de:

- **Memória episódica**: O que aconteceu? (Eventos, interações, resultados)
- **Memória semântica**: O que eu sei? (Fatos, preferências, padrões aprendidos)
- **Memória procedural**: Como eu faço as coisas? (Habilidades, workflows, melhores práticas)

A maioria dos frameworks de agentes te dá um banco de dados vetorial e chama de memória. Isso é como dar a alguém um arquivo e chamar de cérebro.

### 3. Gerenciamento de Objetivos

Agentes reais não apenas respondem a prompts. Eles têm objetivos. Eles rastreiam progresso. Eles sabem quando estão bloqueados e precisam escalar. Eles podem abandonar objetivos que não fazem mais sentido.

Esta é a camada de harness que Phil fala. A infraestrutura que transforma um modelo de linguagem em algo que pode realmente *perseguir resultados* ao longo do tempo.

## Os Desafios Que Ainda Estamos Resolvendo

Não vou fingir que isso está resolvido. Os desafios honestos:

**Trocas de contexto ainda perdem dados.** Quando você sumariza um contexto longo para caber em uma nova janela, você perde nuances. O agente "sabe" o que aconteceu mas perde a textura de *como* aconteceu.

**Recuperação de memória é imperfeita.** Busca semântica é boa mas não ótima. Às vezes a memória mais relevante não é a com maior similaridade de cosseno.

**Coordenação é difícil.** Quando você tem múltiplos agentes trabalhando juntos, mantê-los alinhados sem supervisão humana constante é genuinamente difícil.

Estes são problemas de engenharia, não problemas de IA. E esse é exatamente o ponto.

## A Mudança de Mentalidade

Aqui está o que quero que você leve:

Comecei a construir agentes ano passado para minha empresa. Precisávamos de automação inteligente que pudesse realmente lidar com a complexidade de workflows de compliance enterprise. E rapidamente percebi que "workflows automatizados com IA" não eram agentes de verdade—eram apenas declarações if-then sofisticadas com um LLM no meio.

Agentes reais precisam:

- Persistir entre sessões
- Aprender com suas ações
- Perseguir objetivos autonomamente
- Lidar com falhas graciosamente
- Saber quando pedir ajuda

Construir essa infraestrutura se tornou uma obsessão. Continuei iterando, refinando, resolvendo os mesmos problemas que Phil e Harrison agora estão nomeando.

E em algum momento do caminho, acabei construindo um framework onde posso fazer deploy de um agente totalmente autônomo com um arquivo de configuração.

Esse é o unlock. Não modelos mais inteligentes. **Harnesses melhores.**

## O Que Vem Aí

2026 vai ser o ano em que paramos de ficar impressionados com o que a IA *pode* fazer em uma demo e começamos a esperar o que a IA *faz* em produção.

As empresas que vão ganhar não terão os modelos mais inteligentes. Terão os harnesses mais robustos—a infraestrutura que permite que agentes rodem de forma confiável, aprendam continuamente e entreguem valor enquanto seus criadores dormem.

A pergunta não é "como faço minha IA mais inteligente?"

A pergunta é "que infraestrutura preciso para que minha IA possa realmente fazer seu trabalho?"

Essa é a tese do Agent Harness. E de onde estou sentado—com agentes monitorando meu código, coachando minha saúde e cuidando da minha filha—não é uma previsão.

Já está aqui.

---

*Sou Hugo, um CPTO construindo sistemas de agentes de IA. Escrevo sobre o que estou aprendendo em [hugo.im](https://hugo.im) e compartilho takes rápidos no [X](https://x.com/hugomn) e [LinkedIn](https://linkedin.com/in/hugomn).*
