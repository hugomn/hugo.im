---
author: Hugo Nogueira
pubDatetime: 2026-02-21T10:00:00.000Z
title: "Execução Ficou Barata. Julgamento, Não: Agentes de IA e o Fim da Divisão CTO/CPO"
locale: pt
postSlug: execution-is-cheap-judgment-isnt
featured: true
draft: false
tags:
  - ai-agents
  - leadership
  - engineering
  - product-thinking
description: "Quando a execução se torna abundante graças aos agentes de IA, o julgamento vira o gargalo. A separação tradicional entre liderança técnica e de produto começa a não fazer mais sentido."
image: "/images/blog/20260221-ai-agents-collapse-the-cto-cpo-divide.jpg"
imageAlt: "Texto sobre decisão para apresentação de liderança e negócios"
imageAttribution: "Foto de Edho Pratama no Unsplash"
---

Na semana passada, meu time entregou a primeira versão de um projeto do qual me orgulho muito: construímos um framework interno de agentes de IA em duas semanas. O tipo de infraestrutura que teria levado três a quatro meses um ano atrás.

Minha primeira reação não foi satisfação. Foi uma pergunta silenciosa e incômoda: se conseguimos construir tão rápido, qual é o gargalo agora?

A resposta me forçou a repensar algo que achei que já estava resolvido.

---

## A divisão CTO/CPO era uma solução para um problema diferente

Durante a maior parte da última década, construir software era o recurso escasso. Times grandes, ciclos longos, capital significativo. Decisões de arquitetura eram caras de reverter. As apostas de produto tinham loops de feedback medidos em trimestres. Nesse mundo, separar a liderança de engenharia da liderança de produto fazia sentido. Um papel otimizava o _como_. O outro otimizava o _o quê_ e o _por quê_. A separação não era disfunção. Era uma resposta honesta à estrutura de custos do software.

A IA está desmontando essa estrutura de custos.

Agentes conseguem hoje montar sistemas prontos para produção em horas. Ciclos de prototipagem que levavam semanas levam dias. Quando a execução se torna abundante, o gargalo não desaparece. Ele sobe. Para priorização. Para definição de problemas. Para o julgamento sobre o que vale a pena construir.

E aqui está a parte que dói: a IA não comprime o custo de construir a coisa errada. Ela amplifica. Quando seu time entrega mais rápido do que nunca, uma direção ruim se agrava mais rápido do que nunca. A velocidade de execução expõe a fragilidade do julgamento.

Nesse ambiente, a arquitetura mais importante de uma empresa não é a base de código do sistema. É o sistema de decisões.

---

## Quando o gargalo muda, o organograma também deveria mudar

Quando construímos esse framework de agentes em duas semanas, a vitória imediata era óbvia. Mas o que ficou claro quase imediatamente foi que o problema difícil tinha simplesmente mudado de lugar. A pergunta deixou de ser "conseguimos construir isso?" e passou a ser "o que esse framework deve fazer, para quais fluxos de trabalho, sob quais restrições, e o que significa se errar?"

Essa última parte importa muito no contexto de compliance. Um agente de IA atuando em GRC com autonomia demais cria exposição regulatória. Com autonomia de menos, você construiu uma automação cara que ainda exige supervisão constante, o que destrói a proposta de valor inteiramente.

Enfrentei isso diretamente quando estávamos desenhando uma feature de sugestão que usa geração aumentada por recuperação. A decisão técnica central era: otimizar para recall ou para precisão. Recall significa que o modelo traz mais candidatos, com o risco de incluir falsos positivos. Precisão significa que ele traz menos, mas o que traz é confiável.

Na maioria dos contextos, recall é o padrão razoável. Você sempre pode filtrar depois. Mas essa feature estava surfaceando sugestões de compliance para times empresariais onde um falso positivo não é só ruído. É um sinal de risco que corrói a confiança, e em ambientes regulados, confiança perdida é muito difícil de recuperar. Nesse contexto, precisão não era uma preferência. Era uma necessidade estratégica.

Essa decisão exigiu conhecimento técnico para entender o tradeoff de recuperação, e instinto de produto para entender o que um falso positivo realmente custa ao usuário. Nenhum dos dois sozinho era suficiente. A decisão exigiu manter os dois modelos mentais ao mesmo tempo: o tradeoff de recuperação e a percepção de risco do usuário.

Esse é o padrão que continuo encontrando. As decisões que mais importam em um produto nativo de IA não são puramente de engenharia nem puramente de produto. São as duas coisas, ao mesmo tempo.

---

## Construir o carro, não o cavalo mais rápido

Aqui vai um exemplo diferente, que não tem nada a ver com IA mas tem tudo a ver com por que o modelo CPTO importa.

Por muito tempo, os usuários da nossa plataforma pediam a possibilidade de adicionar referências genéricas entre entidades. O pedido aparecia repetidamente. Era consistente. Tinha sinal forte.

Também era tecnicamente fácil. Um link genérico de "adicionar referência" entre quaisquer duas entidades do sistema. Pense no Jira deixando você linkar uma Task a uma Epic, ou uma Story a um Bug, sem nenhum significado imposto. Poderíamos ter entregado em uma semana.

Mas algo continuava cheirando errado. Fiquei com isso por um tempo, rodei várias discussões, vários brainstorms. O problema com referências genéricas é que elas não carregam semântica. Elas dizem que duas coisas estão relacionadas, mas não como nem por quê. Em uma plataforma de compliance, onde todo o valor está em entender as relações entre controles, riscos, frameworks e evidências, uma relação sem significado é quase pior do que nenhuma relação. Os usuários linkariam coisas e depois não saberiam o que fazer com esses links.

O que construímos foi um sistema de relacionamentos tipados. Cada conexão entre duas entidades tem um significado definido, um contexto, uma lógica de negócio atrelada. Dá mais trabalho para desenhar e mais esforço para construir. E também resolve de fato o problema.

Os usuários pediam um cavalo mais rápido. Precisavam de um carro. O engenheiro em mim sabia que conseguíamos construir o cavalo rapidamente. O lado de produto sabia que o cavalo era a resposta errada. O único motivo pelo qual não entregamos a coisa errada foi que esses dois instintos estavam na mesma pessoa no momento da decisão.

---

## Isso não foi uma transição de cargo para mim

Quero ser cuidadoso aqui, porque "CPTO" pode soar como um movimento de prestígio, dois cargos empilhados em um título. Não é isso que quero dizer, e não foi assim que cheguei aqui.

Quando estava à frente do meuingresso.com no Brasil, não havia time de produto nem time de engenharia. Havia sobrevivência. Cada decisão de onboarding afetava as taxas de conversão. Cada escolha de infraestrutura afetava se a plataforma aguentaria eventos com 15.000 pessoas. Precificação, UX, performance e arquitetura eram o mesmo problema visto de ângulos diferentes. Não os separei porque não podia me dar ao luxo de fazer isso.

Quando me mudei para Berlim para liderar times de engenharia, fui fundo na liderança técnica: construções do zero, escala de times, decisões arquiteturais sob incerteza real. Adorei. Mas nunca fiquei satisfeito com "conseguimos construir isso?" como a pergunta final. As perguntas que não conseguia largar eram: isso vai mudar o comportamento do usuário? Isso cria defensabilidade? O que isso torna impossível para nós mais adiante?

Quando finalmente assumi um papel de CPTO de verdade, o título foi só a formalização de como eu já operava. A mudança não foi mental. Foi estrutural.

O trabalho de verdade se tornou desenhar alavancagem. Decidir o que _não_ construir. Conectar feedbacks de usuários a restrições arquiteturais. Criar capacidades de IA que amplificam times ao invés de apenas automatizar os fluxos existentes.

---

## O que isso significa para quem está construindo agora

A divisão CTO/CPO fazia sentido quando software era principalmente um desafio de execução. Esse mundo está encolhendo rapidamente para empresas que constroem produtos nativos de IA.

Para fundadores: se você ainda está cedo o suficiente para moldar o organograma, resista ao instinto de separar essas responsabilidades cedo demais. As decisões que a IA força você a tomar não respeitam fronteiras organizacionais limpas. Quanta autonomia conceder, o que o sistema faz quando está incerto, o que uma resposta errada custa ao usuário.

Para líderes de engenharia: a transição não é sobre aprender a fazer roadmaps. É sobre internalizar que decisões técnicas são decisões de negócio, e fazer as duas perguntas antes de tomar qualquer uma das duas decisões. Você provavelmente já faz isso de forma informal. A questão é se está fazendo em voz alta o suficiente, e se a organização está estruturada para deixar você fazer isso.

Para líderes de produto: entender o que agentes conseguem e não conseguem fazer de forma confiável em produção, como são os modos de falha em escala, e o que "autônomo" realmente custa em termos de infraestrutura e supervisão: isso não é mais conhecimento de domínio opcional. Isso molda o que você pode prometer e o que você deveria entregar.

As empresas que vão se mover mais rápido não são as que têm os agentes mais capazes. São as que têm a distância entre julgamento e execução quase zerada.

Execução está cada vez mais automatizada. O julgamento sobre o que executar, não.

É aí que a liderança mora agora.

---

_Sou CPTO na Complyance, construindo software de compliance nativo em IA. Também construo agentes autônomos nas horas vagas para automação pessoal e aprendizado. [Escrevi sobre isso aqui](https://hugo.im/tags/ai-agents). Me encontre no [LinkedIn](https://linkedin.com/in/hugomn) ou no [X](https://x.com/hugomn)._
