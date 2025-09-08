---
author: Hugo Nogueira
pubDatetime: 2025-06-28T15:30:00.000Z
title: "Por Que Parei de Estimar: Um Argumento Baseado em Dados Contra Previsões de Software"
locale: pt
postSlug: why-i-stopped-estimating
featured: true
draft: false
tags:
  - desenvolvimento-software
  - agile
  - gestao-projetos
  - estimativas
  - produtividade
  - lideranca-engenharia
  - no-estimates
description: Uma análise baseada em dados sobre por que estimativas de software não funcionam e o que fazer no lugar. Baseado em pesquisas, relatórios da indústria e experiência real com o movimento no-estimates.
keywords: estimativas software, no estimates, desenvolvimento ágil, gestão projetos, produtividade software, Ron Jeffries, metodologia desenvolvimento
image: "/assets/no-estimates.jpg"
---

*Como aumentamos a entrega de features em 40% e salvamos nossa sanidade*

"O release India vai ser entregue amanhã."

Essas quatro palavras costumavam gerar um tipo específico de pavor na Complyance. Significava que as próximas 24 horas seriam um borrão de dias de 14 horas, code reviews apressados, e aquela sensação familiar de empurrar algo que sabíamos que não estava pronto.

Já tínhamos passado por isso nove vezes. Alpha até India, seguindo o alfabeto da aviação. Releases de seis semanas, features cuidadosamente estimadas, promessas feitas para clientes enterprise baseadas nessas estimativas.

Todos. Os. Releases. O mesmo padrão:
- Semana 1-2: "Temos tempo de sobra"
- Semana 3-4: "Está apertando mas é controlável"
- Semana 5: "Precisamos cortar algumas features"
- Semana 6: "Todos no barco, prometemos isso pro cliente"

Depois do India, fizemos algo radical: jogamos o sistema inteiro fora.

Sem mais releases. Sem mais estimativas. Sem mais promessas baseadas em chutes.

O resultado? A entrega de features aumentou 40%. O moral da equipe se transformou. E paradoxalmente, nossos clientes ficaram mais felizes mesmo sem recebermos datas.

Esta é a história de como aprendemos o que a pesquisa vem nos dizendo há décadas - e por que a maioria das equipes ainda está errando.

## O Problema Trilionário das Estimativas

O [CHAOS Report do Standish Group](https://www.infoq.com/articles/standish-chaos-2015/), que estudou mais de 50.000 projetos, descobriu que apenas 29% dos projetos de TI têm sucesso (no prazo, no orçamento, com resultados satisfatórios), enquanto 19% são falhas completas e 52% são problemáticos. O custo total das falhas de projeto? [Estimados US$ 260 bilhões anuais apenas nos EUA](https://www.runn.io/blog/it-project-management-statistics), segundo múltiplas análises da indústria.

Mais revelador: múltiplos estudos da indústria mostram consistentemente que estimativas de software estão tipicamente erradas por um fator de 2-4x, e isso não melhorou em décadas apesar de ferramentas e metodologias melhores.

Aqui está o que minha experiência nesta indústria me ensinou: **Não somos ruins em estimar. Estamos tentando prever o fundamentalmente imprevisível.**

## A Física do Desenvolvimento de Software

O desenvolvimento de software viola as leis que fazem a estimativa funcionar em outros campos:

### 1. O Efeito do Observador
No momento em que você estima uma tarefa, você a modifica. Equipes inconscientemente ajustam seu trabalho para se adequar à estimativa - correndo quando estão "atrasadas", polindo demais quando estão "adiantadas". Isso é conhecido como [Lei de Parkinson](https://en.wikipedia.org/wiki/Parkinson%27s_law): o trabalho se expande para preencher o tempo disponível para sua conclusão. A estimativa se torna a realidade.

### 2. O Cone da Incerteza é uma Mentira
O famoso ["Cone da Incerteza"](https://en.wikipedia.org/wiki/Cone_of_uncertainty) sugere que estimativas melhoram com o tempo. Mas pesquisas mostram que no desenvolvimento moderno de software, a incerteza frequentemente aumenta conforme você aprende mais. Por quê? Porque bom desenvolvimento de software é sobre descobrir o que você deveria construir, não apenas construir o que foi planejado.

Na Complyance, vivemos essa realidade por 54 semanas através de nove releases. Cada "melhoria simples de 2 semanas" tinha um iceberg escondido por baixo. Só no release India, três features foram estimadas em uma semana cada. Tempo final de entrega? Cinco semanas, duas semanas, e três dias respectivamente.

Mas aqui está o ponto: sempre conseguimos fazer funcionar. Não porque nossas estimativas melhoraram, mas porque somos engenheiros inteligentes que fariam o que fosse necessário - incluindo aqueles empurrões finais devastadores - para cumprir o prazo arbitrário que definimos para nós mesmos.

A estimativa não estava prevendo o trabalho. O trabalho estava se conformando à estimativa, a um tremendo custo humano.

### 3. A Cascata de Complexidade
A complexidade de software segue uma [distribuição de lei de potência](https://en.wikipedia.org/wiki/Power_law). A maioria das mudanças são triviais, algumas são moderadas, mas uma pequena porcentagem são exponencialmente complexas. O problema? Você não pode dizer qual é qual até estar no meio do caminho. Esse padrão é bem documentado em múltiplos projetos de software e códigos.

Através dos nossos nove releases, vimos esse padrão repetidamente: tarefas "simples" que revelaram problemas fundamentais de arquitetura, e features "complexas" que se mostraram diretas graças a bibliotecas ou abordagens existentes que descobrimos durante a implementação.

Depois de nove releases, nossa precisão de estimativas não estava melhorando. Por quê? Porque cada release nos ensinava mais sobre o que não sabíamos.

## Os Custos Escondidos Que Ninguém Fala

Vamos fazer as contas do que a estimativa realmente custa:

**Custos diretos (baseado em pesquisa da indústria e nosso próprio rastreamento):**
- Planejamento de sprint com estimativas: 4 horas/sprint × 26 sprints = 104 horas/ano por pessoa
- Refinamento de backlog e estimativas: 2-3 horas/semana × 50 semanas = 100-150 horas/ano por pessoa
- Reuniões de reestimativa e ajuste: ~50 horas/ano por pessoa
- **Total: 250-300 horas/ano por desenvolvedor = 6-7.5 semanas de tempo de desenvolvimento perdido**

**Custos indiretos (mais difíceis de medir, mas mais prejudiciais):**
- Troca de contexto de reuniões de estimativa
- Impacto no moral de "perder" estimativas
- Jogos políticos em torno de inflacionar estimativas
- Supressão da inovação (evitando trabalho difícil de estimar)

Com um salário médio de desenvolvedor de $130.000/ano, isso são 6.3 semanas × 10 desenvolvedores = 63 semanas de produtividade perdida anualmente. **Isso é mais de um ano completo de desenvolvedor de capacidade perdida apenas com overhead de estimativas.**

## A Transformação: O Que Realmente Funciona

Depois do India, fizemos a mudança. Aqui está exatamente o que fazemos agora na Complyance - e o que os dados mostram sobre por que funciona:

### 1. De Releases para Fluxo Contínuo
**Antes (Alpha até India):** Releases de 6 semanas, batching de features, planning poker, sessões de planejamento de release, modo crise da última semana

**Depois:** Deploy contínuo, uma chamada semanal de refinamento (nossa única reunião restante de uma longa lista), entrega diária

A mudança psicológica foi imediata. Sem mais "calmaria da semana 1" seguida de "pânico da semana 6". Apenas progresso estável e sustentável. Nossa velocidade realmente se tornou previsível - não através de estimativas, mas através de fluxo consistente.

### 2. Fatias Finas em Vez de Grandes Lotes
Em vez de estimar uma "feature completa" e agrupá-la para um release, entregamos incrementos:
- Segunda: Funcionalidade básica que funciona para um caso de uso
- Quarta: Casos extremos tratados baseado no que aprendemos
- Sexta: Performance otimizada onde importa
- Próxima semana: Melhorado baseado em dados reais de uso

Nossos clientes agora veem progresso diariamente em vez de a cada 6 semanas. Eles podem começar a usar features imediatamente. E podemos pivotar baseado em feedback real, não requisitos imaginados.

### 3. Tempo Fixo, Escopo Variável
Comprometemos com caixas de tempo, não listas de features:
- "Vamos trabalhar em melhorias de busca por 2 semanas"
- "A equipe vai focar em performance até as métricas melhorarem 20%"
- "Temos 1 mês para tornar o onboarding delicioso"

Isso inverte toda a conversa. Em vez de "Quando X vai estar pronto?" vira "Qual o máximo de valor que podemos entregar até a data Y?"

### 4. Previsão Probabilística Quando Necessário
Quando absolutamente precisamos fornecer previsões (para compliance regulatório, contratos grandes, etc.), usamos previsão probabilística baseada em dados reais de tempo de ciclo:

- Rastrear quanto tempo itens de trabalho realmente levam (não estimativas, dados reais)
- Rodar projeções estatísticas baseadas em throughput histórico
- Fornecer intervalos de confiança: "Baseado no nosso ritmo atual, provavelmente 10-15 features até Q3"

Isso é tanto mais honesto quanto mais preciso que estimativas tradicionais.

## Os Resultados: Mais Que Apenas Números

Depois de abandonar releases e estimativas:

Os números:
- 40% de aumento em features entregues
- 60% de redução em bugs (sem mais código apressado da semana 6)
- 90% de redução em reuniões (de planning poker, planejamento de release, sessões de estimativa para apenas um refinamento semanal)
- Zero madrugadas no último ano (costumávamos ter 9)

O lado humano:
- Sem mais ciclos de ansiedade de release
- Engenheiros realmente tiram férias sem cronometrá-las em torno de releases
- Clientes mais felizes apesar de não receberem datas prometidas (eles veem progresso constante)
- Moral da equipe em alta histórica

A métrica mais reveladora? Não tivemos um único "modo crise" desde que abandonamos as estimativas. Nem um.

### 5. A Mentalidade de Investimento
Tratamos desenvolvimento como um capitalista de risco trata startups:
- Pequenos investimentos iniciais
- Dobrar a aposta no que está funcionando
- Matar o que não está
- Abordagem de portfólio para risco

Nenhum VC pergunta a uma startup "Quantos dias vai levar para alcançar product-market fit?" Eles investem em etapas e ajustam baseado em resultados.

## Os Contra-Argumentos (E Por Que Estão Errados)

"Mas precisamos de previsibilidade para planejamento de negócio!"

Você está recebendo previsibilidade falsa agora. Análises da indústria mostram consistentemente que estimativas tradicionais estão erradas em 100-200% em média. Previsões meteorológicas são mais precisas em 7 dias do que a maioria das estimativas de software em 7 dias.

Previsibilidade real vem da entrega consistente de valor, não chutes precisos sobre o futuro.

"Como escolhemos entre projetos sem estimativas?"

[Custo do Atraso](https://blackswanfarming.com/cost-of-delay/). Em vez de perguntar "Quanto tempo?" pergunte "Quanto custa esperar?" Um cálculo aproximado de valor/semana perdido supera uma estimativa precisa de tempo de desenvolvimento toda vez.

"Nossos contratos exigem compromissos de escopo fixo e tempo fixo!"

Enfrentamos isso na Complyance. Vários clientes enterprise tinham compromissos de roadmap baseados nas nossas promessas de release de 6 semanas. Aqui está como lidamos com a transição:

1. Mostramos a eles nossos dados reais de entrega (promessas versus realidade ao longo de 9 releases)
2. Oferecemos um acordo melhor: entrega contínua com capacidade de mudar prioridades a qualquer momento
3. Garantimos throughput (features por mês) em vez de features específicas por datas específicas

Resultado? A transição correu mais suavemente que esperado, com clientes se adaptando bem à abordagem de entrega contínua.

Se isso não funcionar, considere: O [governo do Reino Unido economizou £800 milhões](https://www.gov.uk/government/publications/government-digital-strategy) mudando para contratos ágeis. Se a aquisição governamental pode evoluir, a sua também pode.

"Isso nunca funcionaria em indústrias regulamentadas!"

Na verdade é onde a entrega contínua brilha. Reguladores se importam com resultados e gestão de risco, não com seus story points. Na verdade, entrega contínua frequentemente melhora compliance reduzindo tamanhos de lote e aumentando rastreabilidade. Releases menores e mais frequentes são mais fáceis de auditar e reverter se necessário.

## O Movimento #NoEstimates Estava Certo o Tempo Todo

[Allen Holub](https://holub.com/noestimates-an-introduction/), uma das principais vozes do movimento #NoEstimates, coloca de forma direta: "Estimativas são desperdício. Não apenas não são necessárias, mas introduzem disfunção na equipe."

Na Complyance, vivemos essa disfunção por 54 semanas. Toda estimativa se tornou um compromisso. Todo compromisso se tornou uma crise. Toda crise corroeu a confiança.

[Ron Jeffries](https://ronjeffries.com/), signatário do Manifesto Ágil, coloca ainda mais diretamente em sua [análise sobre estimativas](https://ronjeffries.com/articles/019-01ff/estim-twitter/):

> "Estimativas de itens de backlog são desnecessárias para desenvolvimento Ágil eficaz. Como são desnecessárias, devem ser eliminadas até que se prove que são necessárias."

Mas aqui é onde tanto Holub quanto nossa experiência vão além: Mesmo com segurança psicológica perfeita e sem pressão de prazo, estimativas são desperdício. Elas estão respondendo a pergunta errada.

A pergunta certa não é "Quanto tempo isso vai levar?" É "No que devemos trabalhar em seguida para entregar mais valor?"

Como Holub diz: "Planejamento acontece constantemente. Suas projeções mudam toda vez que você completa uma story." Foi exatamente isso que descobrimos - previsibilidade real vem de medir o que realmente entregamos, não adivinhar o que podemos entregar.

## Seu Desafio de 30 Dias Sem Estimativas

*Inspirado pelo [movimento #NoEstimates](https://www.infoq.com/articles/noestimates-monte-carlo/)*

Ainda cético? Experimente isso:

1. **Semana 1-2:** Rastreie tudo mas não estime. Apenas construa e meça.
2. **Semana 3:** Compartilhe diariamente o que completou, não o que planejou.
3. **Semana 4:** Faça previsões usando seus dados reais, não chutes.
4. **Semana 5:** Compare resultados com seu último sprint estimado.

Equipes que abraçam essa abordagem relatam o mesmo padrão: menos tempo falando sobre trabalho, mais tempo fazendo trabalho, desenvolvedores mais felizes, e - surpreendentemente - stakeholders mais felizes.

## A Conclusão: Um Novo Modelo Mental

Aqui está a mudança fundamental: Desenvolvimento de software não é construção. É descoberta.

Quando você constrói uma casa, você sabe o que está construindo. Os desconhecidos são mínimos. Estimativas funcionam.

Quando você desenvolve software, você está descobrindo:
- O que usuários realmente precisam (versus o que dizem que querem)
- Quais abordagens técnicas funcionam (versus o que parecia bom em teoria)
- Quais são as restrições reais (versus o que você assumiu)

Você não pode estimar descoberta assim como Colombo não podia estimar quanto tempo levaria para "chegar às Índias." Ele estava resolvendo o problema completamente errado.

As empresas que estão tendo sucesso hoje - de Spotify à Amazon à Netflix - não estimam melhor. Elas construíram sistemas que tornam estimativas irrelevantes. Elas entregam continuamente, medem constantemente, e pivotam rapidamente.

A pergunta não é "Como podemos estimar melhor?"

É "Como podemos construir sistemas onde estimativas não importam?"

Pare de estimar. Comece a entregar. Seus usuários estão esperando.

---

*Qual sua experiência com estimativas? Já tentou trabalhar sem estimativas? Compartilhe sua história nos comentários ou [entre em contato diretamente](/contact). Respondo a todas as mensagens.*

## Leituras Complementares

- [O Movimento NoEstimates](https://www.infoq.com/articles/noestimates-monte-carlo/) - Visão geral abrangente
- [Livro NoEstimates do Vasco Duarte](http://noestimatesbook.com/) - Mergulho profundo na prática
- [Allen Holub sobre Por Que Estimativas São Malévolas](https://www.youtube.com/watch?v=QVBlnCTu9Ms) - Excelente palestra
- [Análise do CHAOS Report 2015 do Standish Group](https://www.infoq.com/articles/standish-chaos-2015/) - Últimas estatísticas públicas disponíveis
- [Comentário sobre o CHAOS Report](https://hennyportman.wordpress.com/2021/01/06/review-standish-group-chaos-2020-beyond-infinity/) - Análise do relatório de 2020

---

*Foto do cabeçalho por [Josh A. D.](https://unsplash.com/@mista_j) no [Unsplash](https://unsplash.com/photos/a-person-holding-a-tape-measure-in-their-hand-wTtBtw80erg)*