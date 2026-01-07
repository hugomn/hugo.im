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

Dois dias atrás, Philipp Schmid publicou uma tese que me fez parar por alguns segunods: ["Se 2025 foi o início dos agentes, 2026 será sobre Agent Harnesses."](https://www.philschmid.de/agent-harness-2026)

Estou construindo agentes autônomos há meses. Primeiro para minha empresa, depois para minha vida pessoal. E ler o [post do Phil](https://www.philschmid.de/agent-harness-2026) foi como se alguém finalmente desse um nome ao que eu vinha enfrentando nas trincheiras.

O insight não é que precisamos de modelos mais inteligentes. Esses já temos.

O insight é que **inteligência sem infraestrutura é apenas uma demo**.

## O Que é um Agent Harness?

Phil define Agent Harness como a camada de infraestrutura ao redor de um modelo que permite trabalho de longa duração orientado a objetivos. Ele lida com presets de prompts, execução de ferramentas, gerenciamento de ciclo de vida, memória e recuperação. Em outras palavras, tudo que acontece depois da primeira resposta.

Um modelo mental útil: **o Agent Harness é o Sistema Operacional. O LLM é apenas a CPU.**

Harrison Chase, da LangChain, [recentemente formalizou](https://blog.langchain.com/agent-frameworks-runtimes-and-harnesses-oh-my/) isso em uma taxonomia que fez sentido para mim:

- **Framework**: Os blocos de construção: como você conecta modelos a ferramentas
- **Runtime**: O motor de execução: execução durável, streaming, human-in-the-loop
- **Harness**: A camada opinativa: prompts, ferramentas, integrações, memória, grafo de contexto

Se você já tentou levar um agente de "demo legal" para "roda de forma confiável em produção", você sabe exatamente por que essa distinção importa.

## O Problema Que Ninguém Fala

Agentes raramente falham porque não são inteligentes o suficiente.

Eles falham porque perdem contexto, perdem estado, ou perdem acesso às ferramentas certas no momento errado.

Uma tarefa não trivial de agente facilmente envolve dezenas de chamadas de ferramentas. Algumas das minhas chegam a centenas. Em algum momento do caminho, janelas de contexto enchem, sumarização entra em ação, e o agente silenciosamente esquece algo essencial.

Eu chamo isso de **Problema da 100ª Chamada de Ferramenta**. Não porque sempre acontece na 100ª, mas porque a degradação é inevitável quando a tarefa ultrapassa uma única janela de contexto.

É por isso que a Anthropic tem falado sobre durabilidade de contexto: agentes inicializadores, artefatos persistentes e progresso incremental entre sessões.

Este é o verdadeiro desafio de engenharia de 2026. Não prompt engineering. **Context engineering.**

## Como Isso Realmente Funciona

Deixa eu mostrar o que quero dizer. Tenho vários agentes rodando partes da minha vida e trabalho agora. Não são chatbots com quem eu converso. São sistemas que operam com intenção e persistência.

### Sentinel: O Guardião do Código

![Agente Sentinel abrindo automaticamente um PR para corrigir preços do modelo Amazon Nova](/images/blog/20260108-sentinel-pr-screenshot.jpg)

Sentinel monitora partes da minha base de código em busca de warnings e regressões. Quando encontra um problema, ele não me notifica. Ele abre um pull request com uma correção proposta.

Eu acordo com problemas resolvidos, não alertas.

### Hopper: O Especialista em Enterprise

![Agente Hopper revisando um PR para copy alinhado com o cliente](/images/blog/20260108-hopper-pr-review.jpg)

Na minha empresa, construímos um agente que revisa PRs por mais do que qualidade de código. Ele verifica se o texto está alinhado com como nossos usuários realmente falam: CISOs, gerentes de compliance, equipes de segurança. Ele pega os momentos sutis onde engenheiros acidentalmente escrevem para si mesmos em vez de para os usuários.

### Coach de Paternidade: O Momento Que Mudou Tudo

![Agente coach de paternidade verificando durante uma emergência de saúde](/images/blog/20260108-parenting-coach.jpg)

Eu e minha esposa criamos um agente coach de paternidade para nos ajudar a navegar os desafios diários de criar nossa filha. Mês passado, ela teve vários episódios de vômito que nos deixaram preocupados. Ligamos para a pediatra imediatamente, e enquanto minha esposa estava no telefone recebendo orientação médica, eu mandei uma mensagem para o coach perguntando sobre possíveis causas.

Aqui é onde fica interessante. O agente detectou um padrão incomum: urgência, input fragmentado e falta de follow-ups. Em vez de sua resposta detalhada típica, ele raciocinou que poderíamos estar estressados e que uma mensagem longa seria a última coisa que precisávamos. Então ele enviou um check-in simples pedindo para respondermos com um emoji para saber que estávamos bem. Mandamos um coração.

Leia de novo. **Um agente entrou em contato para ver se estávamos bem durante um momento estressante.** Não porque eu programei esse cenário. Esse comportamento emergiu de como o agente raciocina sobre incerteza e carga cognitiva.

No final não foi uma emergência. Fomos ao hospital por precaução, ela foi medicada e voltamos para casa bem. Mas aquele momento ficou comigo, porque demonstrou algo importante: bom comportamento de agente muitas vezes é sobre contenção, não verbosidade.

Isso não é um chatbot. Isso não é um workflow com triggers e outputs. Ninguém construindo um coach de paternidade pensaria em adicionar "peça um emoji se eles estiverem no telefone com o médico." O agente descobriu isso sozinho. Isso é um agente.

### Chief of Staff: Assistência Consciente do Contexto

![Agente Chief of Staff respeitando um sábado zero agenda](/images/blog/20260108-chief-of-staff.jpg)

Tenho um agente Chief of Staff com acesso ao meu calendário. Ele me envia briefings diários, me lembra de prioridades e me mantém no caminho certo durante a semana.

Todo mês, eu e minha esposa temos um sábado "zero agenda". Sem reuniões, sem tarefas, sem mensagens. O agente sabe disso. Então, quando tinha atualizações para compartilhar em um desses sábados, ele decidiu ficar quieto e respeitar o limite.

Mas então ele notou algo no meu calendário: uma entrega de comida chegando às 15h. Eu precisava estar em casa.

Então ele me enviou uma única mensagem: "Aviso rápido, você tem uma entrega chegando às 15h. Aproveite seu sábado zero agenda. Vou ficar quieto agora."

Essa é a diferença entre automação e agência. Ele entendeu a regra (ficar quieto), identificou uma exceção (entrega com horário definido) e exerceu julgamento. Ninguém programou esse cenário específico. O agente descobriu sozinho.

## A Infraestrutura Que Torna Isso Possível

Nada disso funciona sem infraestrutura que trata agentes como sistemas de longa duração.

### 1. Execução Durável

Agentes precisam sobreviver a falhas. Reinícios, problemas de rede, erros de API não podem resetar o progresso. É aqui que orquestradores de workflow se tornam essenciais: ferramentas como Temporal, LangGraph, Inngest e Trigger.dev fornecem checkpointing, recuperação e a capacidade de retomar exatamente de onde você parou.

O padrão é o mesmo em todos eles: tratar tarefas de agentes como workflows duráveis, não chamadas de função efêmeras.

### 2. Arquitetura de Memória

Um banco de dados vetorial sozinho não é memória. Agentes úteis precisam de:

- **Memória episódica**: O que aconteceu? (Eventos, interações, resultados)
- **Memória semântica**: O que eu sei? (Fatos, preferências, padrões aprendidos)
- **Memória procedural**: Como eu faço as coisas? (Habilidades, workflows, melhores práticas)

É por isso que sistemas de memória dedicados estão surgindo: Mem0, Zep e Letta estão todos atacando o problema de dar aos agentes memória persistente e estruturada que vai além de simples recuperação.

A maioria dos frameworks de agentes te dá um banco de dados vetorial e chama de memória. Isso é como dar a alguém um arquivo e chamar de cérebro.

### 3. Gerenciamento de Objetivos

Agentes reais não apenas respondem a prompts. Eles têm objetivos. Rastreiam progresso. Sabem quando estão bloqueados e precisam escalar. Podem abandonar objetivos que não fazem mais sentido.

Esta é a camada de harness que Phil fala. A infraestrutura que transforma um modelo de linguagem em algo que pode realmente *perseguir resultados* ao longo do tempo.

## Os Desafios Que Ainda Estamos Resolvendo

Não vou fingir que isso está resolvido. Os desafios honestos:

**Sumarização perde nuance.** Quando você comprime um contexto longo para caber em uma nova janela, você perde textura. O agente "sabe" o que aconteceu mas perde o detalhe de *como* aconteceu.

**Recuperação de memória é probabilística.** Busca semântica é boa mas não ótima. Às vezes a memória mais relevante não é a com maior similaridade de cosseno.

**Coordenação é frágil.** Quando você tem múltiplos agentes trabalhando juntos, mantê-los alinhados sem supervisão humana constante é genuinamente difícil.

Estes são problemas de engenharia, não problemas de modelo. E essa distinção importa.

## A Mudança de Mentalidade

Comecei a construir agentes porque automação simples não era suficiente. Workflows com LLMs no meio ainda quebram sob complexidade do mundo real.

Agentes reais precisam:

- Persistir entre sessões
- Aprender com suas ações
- Perseguir objetivos autonomamente
- Lidar com falhas graciosamente
- Saber quando pedir ajuda

Com o tempo, me vi repetidamente reconstruindo as mesmas peças de infraestrutura. Memória. Durabilidade. Rastreamento de objetivos. Limites de contexto.

Eventualmente, essas peças se solidificaram em uma abstração de harness reutilizável.

Esse é o unlock. Não modelos mais inteligentes. **Harnesses melhores.**

## O Que Vem Aí

2026 vai ser o ano em que paramos de ficar impressionados com o que a IA *pode* fazer em uma demo e começamos a esperar o que a IA *faz* em produção.

As empresas que vão ganhar não terão os modelos mais inteligentes. Terão os harnesses mais robustos: a infraestrutura que permite que agentes rodem de forma confiável, aprendam continuamente e entreguem valor silenciosamente.

A pergunta não é "como faço minha IA mais inteligente?"

A pergunta é "que infraestrutura preciso para que minha IA possa realmente fazer seu trabalho?"

Essa é a tese do Agent Harness. E de onde estou sentado, com agentes monitorando meu código, organizando minha agenda e coachando minha família, não é uma previsão.

Já está aqui.

---

*Sou Hugo, um CPTO construindo sistemas de agentes de IA. Escrevo sobre o que estou aprendendo em [hugo.im](https://hugo.im) e compartilho takes rápidos no [X](https://x.com/hugomn) e [LinkedIn](https://linkedin.com/in/hugomn).*
