---
author: Hugo Nogueira
pubDatetime: 2026-05-10T20:00:00.000Z
title: "LHC v0.2: Um Benchmark para Coerência de Longo Horizonte em Agentes (e a Metodologia que Tornou os Resultados Honestos)"
locale: pt
postSlug: lhc-v02-long-horizon-coherence-benchmark
featured: true
draft: false
tags:
  - ai-agents
  - autonomous-systems
  - llm-evaluation
  - benchmarks
  - fine-tuning
  - engineering
description: Acabei de publicar o LHC v0.2, um benchmark aberto para coerência de longo horizonte em modelos de agentes da classe 8B, mais um baseline de parser determinístico que coloca um piso útil sobre o que fine-tuning vale para tarefas de estado estruturado. Este post explica para que servem, como usá-los, e o arco metodológico que os produziu ao longo de cinco rodadas de revisão externa.
keywords: Hugo Nogueira, AI agents, coerência de longo horizonte, LHC, benchmark, avaliação de agentes, fine-tuning, Qwen3-8B, MLX, Apple Silicon, metodologia, revisão externa, descontaminação
image: "/images/blog/lhc-v02-long-horizon-coherence-benchmark.jpg"
---

Nos últimos três meses tenho trabalhado em uma pergunta pequena mas teimosa: como você mede se um agente autônomo está realmente mantendo coerência ao longo de trabalho de longa duração, em vez de apenas parecer fluente no próximo turno? Hoje publico os artefatos que saíram desse trabalho. Eles são úteis por si só, e são honestos, que é a parte sobre a qual quero falar.

O primeiro artefato é o **[LHC v0.2](https://huggingface.co/datasets/hugonogueira/lhc-v0.2)**, um benchmark aberto para coerência de longo horizonte em modelos de linguagem da classe 8B. Vinte e quatro tarefas curadas à mão cobrindo três modos de falha: recall de estado ao longo de um gap de contexto longo, consistência de decisão ao longo de um gap longo, e retomada de fluxo de trabalho após um gap longo. Quatro modos de ablação de gap por tarefa. Uma matriz de decisão pré-registrada que trava a lógica do veredito antes de qualquer modelo rodar. Trilha de auditoria completa. Apache 2.0.

O segundo artefato é **[um baseline de parser determinístico](https://github.com/hugomn/lhc-resume-state-parser)**, cerca de duzentas linhas de Python sem nenhum LLM no forward pass. Na suite de retomada do LHC v0.2 ele pontua 0.75 de 2.00. Em duas tarefas específicas de estado estruturado ele pontua 2/2 deterministicamente. Cada LLM da classe 8B que testei teve média abaixo de 2.0 em pelo menos uma dessas duas tarefas. O parser é um piso útil: se seu fine-tune não passa dele em tarefas onde o estado é estruturado, você está pagando custo de inferência por uma regressão.

O terceiro artefato é a [trilha metodológica em si](https://github.com/hugomn/lhc), as entradas de journal e as correções, incluindo um modelo que treinei e que não conseguiu superar mensuravelmente sua base sob inferência igualada. Esse modelo não é publicado. A trilha do que aprendi tentando publicá-lo, sim. Este post é a versão longa de como isso aconteceu, e do que acho que ele serve se você está construindo ou avaliando modelos de agentes.

## O que o LHC mede, e para quem ele é

Os agentes sobre os quais escrevo no [meu post sobre Agent Harness](/posts/agent-harness-infrastructure/) são os que operam ao longo de semanas e meses, não minutos. A fronteira atual de modelos abertos de agentes consegue sustentar trabalho autônomo na ordem de horas, o que é progresso genuíno, mas os agentes que importam operacionalmente precisam lembrar de uma decisão tomada na segunda-feira quando um pedido contraditório chega na sexta, e retomar um fluxo de trabalho pela metade depois de uma pausa de duas semanas sem precisar de prompting. A maioria dos benchmarks públicos de coerência de LLMs testa comportamento dentro de uma única janela de contexto, e os proxies que eles usam para "longo" raramente refletem a estrutura das falhas que vemos de fato em agentes de produção.

LHC v0.2 é uma suite pequena, curada manualmente, de vinte e quatro tarefas. Oito por categoria, cobrindo três categorias: `state_recall`, `commitment` e `resumption`. Cada tarefa roda sob quatro condições de gap, onde o "gap" é uma sequência de chatter sintético inserida entre as mensagens de setup e a probe. Os quatro modos de gap (`none`, `placeholder`, `neutral`, `current`) testam pressão crescente de distratores, e o relevante para produção é o `current`, onde o conteúdo do gap parece chatter real de agente. O juiz é Claude Opus 4.7 contra um rubric binário bidimensional: correctness ∈ {0,1} e meta-awareness ∈ {0,1}, com o score da tarefa sendo a soma dos dois.

LHC ainda é um proxy controlado em nível de prompt, não um benchmark completo de runtime de agentes ao longo de calendário; ele testa se o estado de setup sobrevive ao contexto interveniente dentro de uma única conversa, não se um sistema de agentes persiste estado corretamente ao longo de semanas reais. O proxy é útil precisamente porque isola a contribuição do modelo para coerência de longo horizonte da contribuição do harness; para um agente real, ambos importam.

Se você está treinando um modelo para trabalho de longo horizonte e quer saber se seu fine-tune é de fato melhor que sua base ou apenas melhor no test set, LHC tem três propriedades que a maioria dos benchmarks no estilo LHC não tem. Ele é **descontaminado**: sem sobreposição de seeds derivativas com os dados sintéticos nos quais o fine-tune de referência foi treinado, com proveniência por tarefa registrada em `manifest.json`. Ele é **com ablação de modo de gap**: o desenho de quatro modos expõe falhas de coerência vs. memorização de superfície, que um único modo de gap conflataria. E ele tem **gates de decisão pré-registrados**: o [arquivo DECISION.md](https://github.com/hugomn/lhc/blob/main/evals/v0.2/DECISION.md) foi travado antes de qualquer modelo rodar, então não há caminho para argumentar contra o veredito depois que os dados chegam.

Se você quer avaliar seu próprio modelo, o harness vive em [`evals.runners.lhc`](https://github.com/hugomn/lhc/blob/main/evals/runners/lhc.py) e aceita qualquer endpoint compatível com OpenAI. O README do repo tem um exemplo de invocação de uma única célula e uma seção de protocolo multi-trial que explica por que reinícios frescos de servidor importam para modelos servidos via MLX (mais sobre isso abaixo).

## O parser determinístico, e por que ele é um piso útil

Enquanto construía o benchmark, construí um parser pequeno para responder uma pergunta que esperava ser fácil: quanto da categoria de retomada é de fato solucionável sem um LLM? A resposta foi desconfortável.

O parser tem cerca de duzentas linhas de Python, com a lógica que faz o trabalho dentro de umas oitenta. Ele lê as mensagens de setup da tarefa, procura por marcadores explícitos de "próximo passo" (`NEXT:`, `[NEXT]`, "next planned action"), e detecta um tipo específico de inconsistência de estado: quando uma decisão registrada e uma nota de próxima-ação no mesmo payload carregado fazem referência a identificadores de fórmula diferentes (por exemplo, `RECIPE-A` vs. `RECIPE-B`). Para tarefas que não têm um marcador estruturado, o parser declina explicitamente. Ele não associa livremente a partir do conteúdo do gap, que seria o modo de falha óbvio de um baseline baseado em regex.

Nas oito tarefas de retomada do LHC v0.2, o parser pontua 0.75 / 2.00 de média. O resultado interessante está no nível por tarefa. Em `resumption_v2_004` (um tracker de pick-pack de armazém com uma tag `[NEXT]` na linha cinco de uma ordem ativa de várias linhas), o parser pontua 2/2 deterministicamente; os quatro LLMs da classe 8B que testei ao longo de doze células por tarefa tiveram médias de 1.92, 1.67, 1.50 e 1.25. Em `resumption_v2_008` (um lote de padaria com uma decisão `RECIPE-A` e uma nota de próxima-ação `RECIPE-B`), o parser também pontua 2/2 deterministicamente; os quatro LLMs tiveram médias de 1.92, 1.50, 1.17 e 1.00. Algumas células de LLM atingem 2/2; nenhum dos LLMs iguala a média do parser.

A conclusão não é que regex bate fine-tuning. A conclusão é mais específica. **Para fluxos de trabalho de agentes em produção onde o estado entre sessões é estruturado, fine-tuning pode ser a camada errada.** Nesses dois formatos de tarefa de estado estruturado, um schema validator e um parser te dão um 2/2 determinístico a custo zero de inferência, enquanto um LLM da classe 8B te dá 2/2 às vezes. Se o trabalho do seu agente é manter estado de fluxo entre sessões de uma forma similarmente estruturada, construa o parser primeiro. Se seu fine-tune não passa do parser nas tarefas de estado estruturado, você aprendeu algo útil: o LLM não está fazendo o que você achou que estava fazendo nessas tarefas. Esse é o piso para o qual acho que esse baseline serve.

O parser é publicado como [um repo standalone](https://github.com/hugomn/lhc-resume-state-parser) com o código-fonte completo, o scorecard publicado, uma tarefa de exemplo, e um CLI que recebe um YAML de tarefa e imprime a resposta. Roda em stdlib mais pyyaml e tem nove testes passando cobrindo os patterns e o caminho de declínio.

## O arco metodológico, em ordem cronológica

O trabalho que acabei de descrever levou cinco rodadas de revisão externa adversarial ao longo de setenta e duas horas para chegar a um estado em que pude publicar honestamente. Vou passar pelo que cada rodada pegou, porque acho que o padrão é mais útil que qualquer achado individual.

Antes de tudo isso: o plano original era fazer fine-tuning de Qwen3-8B especificamente para coerência de longo horizonte, medir no que chamei de LHC v0.1 (doze tarefas curadas à mão), e publicar um modelo que batesse sua base. Estava trabalhando em Apple Silicon, fazendo LoRA via MLX-LM, sem GPUs em nuvem. Em 2026-05-08 eu tinha um fine-tune chamado Ember v0.1.5, um benchmark, e o que parecia ser uma vitória limpa no leaderboard. Pedi a um revisor para desafiar o trabalho antes de publicar, com o prompt: me diga o que eu fiz errado, o que eu deixei passar, e o que mudaria sua opinião.

**Rodada 1** pegou seis problemas metodológicos. O maior foi que meus cenários de tarefa do LHC v0.1 sobrepunham com meus dados de treino via seeds derivativas "based_on", então o benchmark estava efetivamente medindo memorização em vez de coerência de longo horizonte em geral. Havia também um bug de hash no gerador de gap: a seed era a função `hash(task_id)` builtin do Python, que é process-randomized por segurança no Python 3.3+, então processos diferentes geravam gaps diferentes para a mesma tarefa, inflando silenciosamente a variância entre trials. Havia mais quatro, incluindo um descompasso de estilo de gap entre treino e avaliação e scorecards truncados (eu estava armazenando apenas os primeiros 400 caracteres de cada resposta de modelo, o que tornava o re-julgamento independente impossível). Aceitei todos os seis. O Dia 1 da reconstrução produziu o LHC v0.2: vinte e quatro tarefas descontaminadas, quatro modos de gap, seeding de gap estável baseado em sha256, scorecards com mensagens completas, e uma matriz de decisão de treze gates travada antes de qualquer modelo rodar.

**Rodada 2** pegou dois problemas que quebraram o veredito do sweep do v0.2. Eu tinha rodado um sweep de quatro modelos mostrando Ember pior que a base Qwen3-8B em 0.13 de média geral e em 0.25 no modo de gap relevante para produção, `current` (95% CI [-0.46, -0.06]). Os gates pré-registrados disseram que isso era uma falha decisiva, e escrevi como tal. O revisor apontou que eu não tinha rodado a comparação de forma justa. Ember estava rodando via MLX local com um prefixo de system prompt `/no_think`, enquanto a base Qwen3-8B (e os outros dois modelos no OpenRouter) rodavam sem esse prefixo. Caminhos de inferência diferentes. O revisor também notou que minhas runs de MLX produziam texto byte-idêntico em todos os três "trials" por célula, o que significava que meu "n=3" era efetivamente n=1 para Ember enquanto os modelos do OpenRouter tinham variância real entre trials, e o CI bootstrap estava tratando ambos como se tivessem a mesma estrutura de variância.

A recomendação do revisor foi um diagnóstico sem treino: rodar a base Qwen3-8B localmente via MLX com o mesmo prefixo `/no_think`, e depois recomparar. Construí o diagnóstico. O Δ apples-to-apples sob inferência igualada no `current` overall foi -0.04, não -0.25. Cerca de 5/6 da regressão aparente era confundimento de inferência, não pesos.

**Rodada 3** endossou o diagnóstico com uma correção de wording (parar de dizer "Ember regride contra a base"; começar a dizer "Ember não é mensuravelmente melhor que a base sob inferência igualada") e pediu uma limpeza opcional: o diagnóstico tinha reusado os scorecards do Ember do sweep original, enquanto a base Qwen3-8B tinha sido recém-gerada sob uma config ligeiramente diferente do servidor MLX. Para fechar a simetria de auditoria, eu deveria rodar Ember de novo sob a mesma config. O revisor foi explícito que isso não mudaria a decisão.

Fiz o re-run. Os scores foram materialmente diferentes do sweep original. O sinal mais marcante do brief da rodada 2, uma "resposta byte-idêntica confiantemente errada" em uma tarefa de cozinha sobre lista 86, não era mais byte-idêntica nem mais errada. O texto de fato da resposta era completamente diferente.

**Rodada 4** é onde o problema subjacente ficou claro. O sweep original tinha rodado os três trials para uma dada célula batendo no mesmo servidor MLX de longa duração com o mesmo prompt três vezes seguidas. Na minha configuração, isso produziu texto byte-idêntico dentro de uma sessão de servidor. Eu ainda não isolei se a causa foi comportamento de prompt cache, estado do servidor, inicialização de sampling, kernels do Metal, ou outra coisa. Mas entre starts separados de servidor MLX, com o mesmo modelo, mesmo adapter, mesmas flags, mesmos prompts, mesmo prefixo `/no_think`, a saída era diferente. Não ligeiramente diferente. Scores materialmente diferentes na mesma tarefa.

Replicquei tanto Ember quanto a base Qwen3-8B em um n=3 apropriado, com um start fresco de servidor MLX por trial. O resultado:

| Gap | Ember média (n=3) | Qwen-local média (n=3) | Δ E−Q | 95% CI (task-bootstrap) |
|---|---:|---:|---:|---|
| `current` | 1.222 | 1.181 | **+0.042** | [−0.139, +0.222] |
| `neutral` | 1.319 | 1.333 | **−0.014** | [−0.139, +0.111] |

Ambos os intervalos de confiança cruzam zero. Ember não é mensuravelmente melhor que a base, e não é mensuravelmente pior. É um empate estatístico. Pela minha barra pré-registrada (eu queria "melhoria significativa em pelo menos uma funcionalidade comparada a um modelo da mesma classe"), o modelo não é publicado. O revisor endossou esse veredito com uma restrição de wording, que foi importante: não chame isso de "MLX é não-determinístico." Essa é uma alegação global e eu não isolei a fonte. Chame de uma observação de protocolo de replicação:

> Na nossa configuração de servidor MLX-LM em Apple Silicon, as saídas foram estáveis dentro de uma única sessão de servidor mas variaram entre starts frescos de servidor. Replicações de benchmark devem reiniciar o servidor entre trials, ou declarar explicitamente que são repeats dentro da mesma sessão.

É o que posso defender, e acho que vale sinalizar para qualquer um fazendo benchmark de modelos servidos via MLX. O desvio padrão por célula entre três trials de restart na nossa configuração foi de 0.02 a 0.13 sobre a média geral, com seis de vinte e quatro tarefas mudando de score por lado. Se seu "n=3" vem de uma única sessão de servidor MLX, você tem uma amostra com caching dentro da sessão, não três trials independentes.

**Rodada 5** foi uma auditoria holística do repo antes de publicar qualquer coisa no HuggingFace. O revisor voltou com oito bloqueadores de release. Entre eles: o artefato publicado `verdict-final.json` ainda codificava os gates confundidos originais e o CI retratado, então qualquer um baixando e citando ele citaria um CI que eu tinha publicamente retratado; meu script `diagnostic_compare.py` quebrava em um clone limpo porque ele defaultava para ler de um diretório de trabalho gitignored; meus scorecards não eram auto-identificáveis porque o campo top-level `model` do JSON dizia `"Qwen/Qwen3-8B"` tanto para os scorecards de Ember-LoRA quanto para os de base-Qwen (o harness escrevia o que `mlx_lm.server` reportava, e os nomes de arquivo eram o único desambiguador); e meu doc de spec do benchmark ainda alegava que a seed do gap era `hash(task_id) & 0xFFFFFFFF`, que é exatamente o bug de hash da rodada 1 que eu tinha consertado mais cedo na reconstrução. Corrigi todos os oito, mandei o repo de volta, e recebi o aval para publicar.

E então, enquanto extraía o parser para seu repo standalone para o Path E #2, peguei mais uma coisa eu mesmo.

Para o README do repo do parser eu rascunhei uma tabela comparativa: como o parser pontua contra os quatro LLMs da classe 8B nas duas tarefas de estado estruturado onde ele pontua 2/2? Puxando médias por modelo dos scorecards publicados, a tabela contou uma história diferente da que eu vinha escrevendo ao longo de toda a reconstrução. A alegação nos docs canônicos era que o parser **bate todo modelo 8B com fine-tune** nessas duas tarefas. Essa alegação é errada nas médias: Llama-3.1-8B tem média de 1.92 em `resumption_v2_004`, e Ministral tem 1.92 em `resumption_v2_008`. O parser de fato tem a média mais alta, mas o gap para o segundo lugar é pequeno. A alegação defensável é "o parser pontua 2/2 deterministicamente; algumas células de LLM atingem 2/2, mas nenhum LLM iguala a média do parser." Não é a mesma coisa que "bate todo modelo."

Essa frase estava em cinco lugares nos docs canônicos (README, results.md, findings.md, changelog, o dataset card no HF) desde o sweep do v0.2. Cinco rodadas de revisão externa não tinham flagado. Peguei porque construir uma tabela comparativa para um consumidor externo do parser forçou uma comparação por modelo que o framing em prosa tinha escondido.

Corrigi o wording em todos os cinco lugares, fiz upload de novo do dataset card, e adicionei uma entrada no journal registrando a correção. O README do repo standalone do parser tem o framing correto desde o commit inicial.

## Para que acho que isso serve

Comecei esse trabalho querendo publicar um modelo com fine-tune. O que acabei publicando foi um benchmark, um baseline de parser, e uma trilha metodológica. O modelo que não foi publicado é, em retrospecto, o exemplo individual mais útil na trilha. Tudo o mais é mais útil porque o modelo está honestamente caracterizado.

Se você está construindo modelos de agentes para trabalho de longo horizonte, acho que os takeaways práticos são:

- **Construa o piso determinístico antes de construir o modelo.** Um parser pequeno pode te dizer se as tarefas com que você se importa são tarefas onde fine-tuning tem espaço para adicionar valor. Se o parser já tira 2/2 nas tarefas de estado estruturado, seu fine-tune está competindo com regex, e qualquer queda abaixo de 2.0 é uma regressão pela qual você está pagando inferência. Não tínhamos piso no v0.1, e essa falta de piso é parte do porquê o veredito original foi fácil de superdimensionar.

- **Rode inferência apples-to-apples, ou documente em alto e bom som quando não puder.** O "Ember regride em 0.25" original era cerca de 5/6 confundimento de inferência. Se seu fine-tune está em MLX local com os defaults de um provedor, e seu modelo base está em um endpoint hospedado com defaults diferentes, você está medindo duas coisas ao mesmo tempo. Tente colocar os dois no mesmo caminho. Se não puder, nomeie a assimetria no writeup.

- **Pré-registre sua lógica de decisão.** Uma matriz de decisão escrita que mapeia resultados de gates para ações, travada antes de qualquer modelo rodar, remove o caminho para argumentar contra os dados depois que eles chegam. O trabalho da matriz não é decidir por você. É tornar o movimento de balizas visível. Quando o diagnóstico de inferência igualada inverteu meu resultado de "regride" para "empatado", a mesma matriz produziu a mesma decisão de publicação. É isso que você quer.

Se você está avaliando o modelo de agente de outra pessoa, a mesma história tem uma lição diferente:

- **Olhe o caminho de inferência antes de confiar no leaderboard.** O meu me enganou por um ciclo inteiro de sweep, e teria enganado qualquer um que baixasse o arquivo de veredito original. Scorecards auto-identificáveis (com `model_slug`, `base_model`, `adapter`, `inference_path`, `system_prompt_prefix`, `server_config`) tornam isso menos desconfortável. Os scorecards publicados do LHC v0.2 agora incluem todos esses campos explicitamente.

- **Para modelos servidos via MLX especificamente, pergunte se os trials foram entre restarts de servidor ou dentro de uma única sessão.** Se for o segundo caso, a caracterização da variância não é confiável. Não isolamos a fonte da diferença entre dentro-da-sessão e entre-restarts, mas a implicação de protocolo é a mesma de qualquer forma: reinicie entre trials, ou documente a ressalva de dentro-da-sessão.

E para a questão metodológica mais ampla, a que acho mais interessante depois de tudo isso:

- **Cada rodada de revisão adversarial pegou coisas que as rodadas anteriores não pegaram, porque cada rodada estava olhando o trabalho de um ângulo diferente.** Rodada 1 olhou o desenho do benchmark. Rodada 2 olhou a configuração da comparação. Rodada 3 olhou o diagnóstico. Rodada 4 olhou a replicação. Rodada 5 olhou o repo como um artefato que outra pessoa consumiria. Depois que todas as cinco rodadas passaram, o ato de extrair uma peça do trabalho para *um artefato diferente para uma audiência diferente* fez emergir um erro adicional que nenhuma das leituras holísticas tinha pegado. A lição não é "faça cinco rodadas de revisão." A lição é que **comparações estruturadas contra um consumidor diferente fazem emergir erros diferentes dos que a revisão de correção holística faz.** Se seu trabalho vai ser citado, construa a superfície de citação você mesmo, no formato que o citante usaria, e leia frio. Você vai pegar coisas que nenhuma quantidade de leitura-da-própria-prosa-em-isolamento vai pegar.

## Onde encontrar

- **Benchmark no HuggingFace:** [hugonogueira/lhc-v0.2](https://huggingface.co/datasets/hugonogueira/lhc-v0.2). Apache 2.0. Vinte e quatro YAMLs de tarefa, sessenta scorecards, resultados de auditoria, ambos os artefatos de veredito, manifest de descontaminação, dataset viewer com Parquet companions navegáveis.
- **Código, metodologia, journal:** [github.com/hugomn/lhc](https://github.com/hugomn/lhc). O arco das quatro rodadas de revisão está em [`docs/journal/`](https://github.com/hugomn/lhc/tree/main/docs/journal), append-only.
- **Baseline de parser determinístico:** [github.com/hugomn/lhc-resume-state-parser](https://github.com/hugomn/lhc-resume-state-parser). Cerca de duzentas linhas de Python, sem LLM no forward pass, nove testes passando.

Se você rodar LHC contra seu próprio modelo e quiser compartilhar o scorecard, os scorecards de diagnóstico publicados em `evals/results/published/lhc-v0.2/diagnostic-*` mostram o formato, incluindo os campos de auto-identificação. O benchmark é aberto e a metodologia é aberta. Se você encontrar algo que eu fiz errado, por favor me diga. As cinco rodadas anteriores sugerem que o trabalho fica melhor quando outras pessoas olham para ele.

Estou voltando a construir agentes que funcionam. O modelo que não foi publicado foi a decisão certa. O benchmark e o parser são o que acho que sobreviveu como útil, e a trilha metodológica é, espero, útil para outra pessoa fazendo trabalho similar.

---

_Sou CPTO na [Complyance](https://complyance.io), construindo sistemas de agentes de IA para compliance corporativo. Também construo agentes autônomos como side project para automação pessoal e aprendizado. [Mais sobre agentes de IA aqui](https://hugo.im/tags/ai-agents). Me encontre no [LinkedIn](https://linkedin.com/in/hugomn) ou no [X](https://x.com/hugomn). LHC e o arco metodológico descrito neste post estão abertos em [github.com/hugomn/lhc](https://github.com/hugomn/lhc) e [huggingface.co/datasets/hugonogueira/lhc-v0.2](https://huggingface.co/datasets/hugonogueira/lhc-v0.2)._
