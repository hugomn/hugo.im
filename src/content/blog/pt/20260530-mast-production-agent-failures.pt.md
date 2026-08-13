---
author: Hugo Nogueira
pubDatetime: 2026-05-30T18:00:00.000Z
title: "O Que 639.000 Passos de Execução Me Ensinaram Sobre Como Agentes de IA Realmente Falham"
locale: pt
postSlug: mast-production-agent-failures
featured: true
draft: false
tags:
  - ai-agents
  - autonomous-systems
  - llm-evaluation
  - observability
  - methodology
  - engineering
description: "Apliquei a taxonomia de falhas MAST a 639.000 passos de execução de agentes de IA rodando em produção por cinco meses. Meu primeiro headline acabou sendo um bug de infraestrutura disfarçado de comportamento do agente. Este post é sobre o que os agentes de fato falham em produção, e sobre a disciplina necessária para não enganar a si mesmo com dados de produção."
keywords: Hugo Nogueira, agentes de IA, taxonomia MAST, falhas de agentes, telemetria de produção, avaliação de LLM, observabilidade, LLM judge, kappa de Cohen, agentes autônomos, análise de falhas
image: "/images/blog/mast-production-agent-failures.jpg"
---

Existe bastante pesquisa sobre por que sistemas multi-agente com LLMs falham. Quase toda ela estuda *tarefas de benchmark*, agentes resolvendo quebra-cabeças dentro de um harness de teste. Eu tive a chance de fazer uma pergunta diferente: o que acontece quando agentes rodam em **produção**, fazendo trabalho real, por meses?

Tive acesso a **639.381 passos de execução** distribuídos em **23.624 runs** de uma plataforma de agentes autônomos em closed alpha, ao longo de cinco meses de operação contínua, cobrindo todos os seus workspaces. Apliquei a **taxonomia MAST** (Multi-Agent System Failure Taxonomy, de [Cemri et al. 2025](https://arxiv.org/abs/2503.13657), 14 modos de falha em 3 categorias) a essa telemetria, e o retrato que apareceu foi diferente da literatura de benchmark de formas que eu não esperava.

(Uma nota sobre escopo: esta é telemetria de plataforma inteira em closed alpha, não os agentes de um time só. Tudo abaixo é agregado, ou seja, contagens, taxas e distribuições, sem texto de trajetória, sem identificadores e sem quebras por workspace.)

O código e os resultados agregados são públicos: **[github.com/hugomn/mast-taxonomy-production-telemetry](https://github.com/hugomn/mast-taxonomy-production-telemetry)**. A telemetria bruta não é (são dados reais de produção), mas todo número abaixo é reproduzível a partir do que está lá.

Este post é tanto sobre o *método* quanto sobre os achados, porque a coisa mais importante que aprendi foi o quão fácil é enganar a si mesmo com dados de produção, e o que é preciso para não fazer isso.

## O achado que quase publiquei estava errado

Esta é a parte de que menos me orgulho e que estou mais feliz por ter pego.

Minha primeira passada tinha um headline claro: **falhas de terminação dominam**. Cerca de 21% dos runs que amostrei terminavam com o agente concluindo o trabalho e então o *passo terminal travando*, com o run nunca fechando de forma limpa. Era o modo de falha mais comum. E era uma ótima história: "agentes são bons em pensar, ruins em parar".

Também era um bug de infraestrutura.

Quando plotei esses travamentos ao longo do tempo, em vez de tratá-los como uma taxa constante, a verdade ficou óbvia. **88% de todos os travamentos caíam em uma única janela de duas semanas.** Antes dela: quase nenhum. Depois dela: quase nenhum. E, dentro dessa janela, o travamento atingiu *15 agentes diferentes simultaneamente*. Isso não é o que comportamento de agente parece. Comportamento de agente é espalhado no tempo e concentrado em alguns poucos agentes mal comportados. O que eu estava olhando é o que um **bug introduzido e depois corrigido** parece: todo mundo quebra ao mesmo tempo, depois todo mundo se recupera.

A taxa de falha contaminada era 8,6%. Limpa, era **3,4%**. Meu headline estava inflado 2,5× por um bug de plataforma que eu teria publicado alegremente como um insight sobre cognição de agentes.

## A disciplina que pega esse tipo de erro

A razão pela qual eu peguei isso é uma regra que eu tornaria obrigatória para qualquer pessoa fazendo esse tipo de análise: **uma taxa de falha em produção não significa nada até você ter separado bugs de plataforma de comportamento do agente.**

A assinatura de um bug de infraestrutura tem três partes, e você precisa das três, porque qualquer uma sozinha vai te enganar:

1. **Concentração temporal.** Falhas concentradas em uma janela, não distribuídas uniformemente.
2. **Simultaneidade entre agentes.** Muitos agentes distintos falhando ao mesmo tempo.
3. **Volume.** Suficiente para importar.

A armadilha é o item 1 sozinho. Uma tool usada intensamente por *um* agente durante *uma* semana também parece "concentrada", mas isso é comportamento real, não bug. Encontrei exatamente esse caso: uma tool tinha 70% das falhas em uma única semana, o que grita "outage" até você notar que todas vieram de um *único agente* trabalhando em um único projeto. Concentração sem espalhamento entre agentes é comportamento, não infraestrutura.

Construí um detector pequeno para essa assinatura e rodei em cima de toda tool que falhava. Ele sinalizou o bug real sem ambiguidade e corretamente *inocentou* as tempestades de agente único. Esse detector está no repo.

E aqui está a parte que importa para honestidade: ele também sinalizou alguns candidatos *mais fracos*, alguns clusters ambíguos, em parte multi-agente e em parte tempestades de retry de um agente só. A tentação é continuar excluindo janelas até os dados ficarem impecáveis. Não fiz isso. Excluí exatamente **uma** janela (a inequívoca) e *documentei mas mantive* o resto, e então rodei uma checagem de sensibilidade mostrando que o headline não muda se eu excluir ou não. **Limpar demais é uma forma própria de desonestidade.** Você consegue fazer qualquer dataset contar uma história lisonjeira deletando as partes inconvenientes. A defesa é excluir apenas o que você consegue provar, e mostrar que seu resultado sobrevive às decisões de julgamento que você não tomou.

## No que os agentes de fato falham (o achado real)

Com o bug removido, o quadro honesto:

**~83% dos runs de produção não têm falha alguma.** Do restante, os modos de falha líderes são:

- **Incompletude de tarefa.** O agente não termina completamente o que se propôs a fazer.
- **Lacunas de verificação.** O agente marca o trabalho como "pronto" ou "verificado" sem de fato checar, frequentemente caindo de volta em dados velhos depois de um erro de tool. Esses são os perigosos, porque o run *parece bem-sucedido*. Nenhum erro dispara. Um dashboard vê verde.

O que chama atenção é o que está *ausente*. O paper do MAST, estudando sistemas multi-agente em benchmark, encontrou desencontros de comunicação entre agentes como algo proeminente: agentes falando um por cima do outro, retendo informação, atrapalhando uns aos outros. Nestes dados de produção, esses modos são **quase inexistentes**. Em parte isso é estrutural, já que os runs desta plataforma são majoritariamente *um agente por ciclo*, então há pouca superfície agente-a-agente para essas falhas ocorrerem. Mas isso em si é um achado: **a topologia de um sistema implantado remodela sua distribuição de falhas.** As falhas sobre as quais você lê em papers de benchmark podem não ser as falhas que você vai realmente ter.

Quando isolei os runs que *de fato* envolviam chamadas genuínas entre agentes, os modos de falha inter-agente aproximadamente dobraram, confirmando que os modos são reais, apenas raros, e presentes somente onde a coordenação de fato acontece.

## Mais duas coisas que os dados disseram

**A plataforma ficou mais confiável conforme escalou.** A taxa de falha caiu de ~14% em fevereiro e março para **0,4% em maio**, enquanto o volume mensal de runs cresceu aproximadamente **4×**. Mais trabalho, menos falhas. Esse é o tipo de tendência que só dá para ver com dados longitudinais de produção, e é discretamente a coisa mais encorajadora de toda a análise.

**Falhas desperdiçam esforço, não dinheiro.** Eu tinha assumido que runs que falham seriam caros, com agentes girando em falso e queimando tokens. Os dados disseram o contrário: runs que falham custam aproximadamente o *mesmo por run* que os limpos, apesar de usarem **2,4× os passos**. Eles falham em chamadas de tool baratas, não em chamadas de modelo caras. O custo da falta de confiabilidade não é a fatura; é o trabalho desperdiçado e o resultado inacabado.

## Sobre usar um LLM para avaliar um LLM

Classifiquei os runs com um LLM-judge, um modelo lendo cada trajetória e atribuindo um modo MAST. Isso é cada vez mais comum e cada vez mais perigoso, porque um LLM judge é uma *opinião*, e uma opinião confiante. A única forma honesta de usá-lo é **medir o quanto você pode confiar nele.**

Então rotulei manualmente um gold set e checei o judge contra ele: **kappa de Cohen de 0,797** sobre se um run falhou ou não, o que é "concordância substancial", não perfeição. E as discordâncias foram informativas: o judge usava sistematicamente demais um modo de terminação, e ocasionalmente marcava um run limpo como falho. Reporto isso, porque o *viés* de um judge é exatamente a coisa que um leitor precisa descontar. Um kappa validado é um fato; um "o LLM disse" não validado é vibe.

## Por que isso importa se você coloca agentes em produção

O aprendizado prático: **as falhas que te machucam são as que sua tooling não consegue ver.** Dashboards de custo, gráficos de latência, taxas de erro: todos mostram verde no run em que o agente marcou confiantemente uma tarefa como completa usando dados velhos. *Semântica* de modo de falha, não spans e não tokens, é a camada que falta. Nenhuma das principais ferramentas de observabilidade de agentes entrega isso. Depois de fazer esta análise, acho que essa é a lacuna que vale a pena construir.

Mas a lição mais profunda é a chata: **dados de produção mentem para você a menos que você os force a provar o que dizem.** Números in-sample, judges não validados, janelas de bug não limpas, datasets limpos demais. Cada um deles vai te entregar uma resposta impressionante e errada. Todo o valor deste exercício não foi a distribuição de falhas. Foi construir algo em que eu de fato confiaria.

---

_Taxonomia e dataset de benchmark: Cemri et al. 2025 ([arXiv:2503.13657](https://arxiv.org/abs/2503.13657)). Código e resultados agregados: [github.com/hugomn/mast-taxonomy-production-telemetry](https://github.com/hugomn/mast-taxonomy-production-telemetry)._

---

_Sou CPTO na [Complyance](https://complyance.io), construindo sistemas de agentes de IA para compliance corporativo. Também construo agentes autônomos como side project para automação pessoal e aprendizado. [Mais sobre agentes de IA aqui](https://hugo.im/tags/ai-agents). Me encontre no [LinkedIn](https://linkedin.com/in/hugomn) ou no [X](https://x.com/hugomn)._
