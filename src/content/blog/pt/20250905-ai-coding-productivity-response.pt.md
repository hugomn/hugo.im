---
author: Hugo Nogueira
pubDatetime: 2025-09-05T14:00:00.000Z
title: "Software produzido em massa? Temos. Por que programar com IA funciona (se você souber usar)"
locale: pt
postSlug: ai-coding-productivity-response
featured: true
draft: false
tags:
  - ia
  - produtividade
  - engenharia
  - programacao
description: Dados reais mostrando ganhos de produtividade de 1082% com ferramentas de codificação IA. Métricas do GitHub, diagramas de fluxo e resposta baseada em evidências com 146.000 linhas entregues em 4 meses.
---

Li o [artigo viral do Mike Judge](https://substack.com/inbox/post/172538377) "Where's the Shovelware? Why AI Coding Claims Don't Add Up", e respeito seu ceticismo. Ele está certíssimo em ficar frustrado com promessas de marketing exageradas e o custo humano de demissões prematuras por "eficiência de IA". Suas perguntas sobre ganhos mensuráveis de produtividade merecem respostas sérias, não mais hype.

Mas eu vivi uma realidade diferente, e a minha história contam uma história convincente (pelo menos pra mim).

## Métodos: como medi a mudança

Antes de mostrar nos resultados, vou compartilhar um pouco de como medi a produtividade:

**Ferramentas Usadas:** Principalmente Claude Code (CLI oficial da Anthropic), complementado com GitHub Copilot para certas tarefas. Comecei uso intensivo em 15 de abril de 2025.

**Abordagem:**
- Frequência e complexidade de commits no GitHub (via API GraphQL)
- Linhas de código entregues (medidas via estatísticas do git)
- Taxas de conclusão de projetos (ideias para produtos concluídas)
- Tempo da idéia ao MVP funcional

**Fonte de Dados:** Todas as métricas extraídas da minha atividade pessoal no GitHub, abrangendo janeiro de 2024 até setembro de 2025. O período "antes da IA" cobre 15 meses; "era IA" cobre 4,5 meses.

**Variáveis de confusão reconhecidas:** Tempo de férias para desenvolvimento focado, experiência passada com fitness tracking, motivação pessoal para projetos. No entanto, ganhos de produtividade persistem em todas as atividades de desenvolvimento, não apenas projetos pessoais.

## Os números não mentem: minha revolução com uso da IA

Desde abril de 2025, usando principalmente Claude Code, entreguei:

**Fitness Tracker Pessoal** (Abril 2025): Um app móvel privado para substituir a planilha do Google que minha família e amigos usavam para nossos desafios fitness. Algo que eu nunca justificaria gastar semanas construindo só para nosso pequeno grupo, mas a IA tornou viável (e divertido!) criar em poucos dias de férias. **67.000 linhas** de código TypeScript com React Native e Supabase.

**Ferramenta Interna de Análise de Riscos** (Agosto 2025): Uma ferramenta corporativa de análise de riscos internos para a Complyance (minha empresa atual) que ficou meses no nosso backlog por falta de recursos. Construí a primeira versão funcional em **3 dias**. **79.000 linhas** de TypeScript em serviços backend e frontend.

**Produção total: 146.000 linhas de código em 4 meses. Mais do que escrevi nos últimos 2 anos combinados.**

Eu sei o que você está pensando: "Linhas de código não são produtividade." Você está 100% certo. Mas essas linhas não são inchaço. Elas representam escopo: aplicações completas com autenticação, camadas de dados, endpoints de API e interfaces polidas. Não são projetos de brinquedo, não é boilerplate. Sistemas reais resolvendo problemas reais.

Mas números brutos contam apenas parte da história. A verdadeira transformação aparece nos meus dados de commits do GitHub:

<div style="margin: 2rem 0;">

![Transformação de Desenvolvimento Potencializada por IA de Hugo Nogueira](/images/ai-productivity-analysis.png)

</div>

O gráfico acima mostra minha atividade no GitHub desde o momento em que comecei a usar Claude Code intensamente. A transformação é inegável: **aumento de 1.082% em commits mensais**, produtividade máxima de 80 commits em um único dia, e uma mudança fundamental entre ter várias "pet-projects" nunca finalizados para realmente alguém que consegue entregar algo usável em seu tempo livre, com taxa de conclusão de 100%.

Estas não são tutoriais ou projetos de portfolio. Meu fitness tracker é ativamente usado pela minha família e amigos que adoram finalmente ter um app adequado em vez de uma planilha de excel. A ferramenta interna na Complyance está resolvendo problemas reais que levariam meses para uma equipe completa abordar.

Aqui está o contexto: Atuo hoje como CPTO. Nos últimos 10 anos, meus dias foram preenchidos com estratégia de produto, gestão de equipe e reuniões com stakeholders. Programar virou meu "trabalho paralelo", algo que eu fazia para me manter tecnicamente afiado e conectado á minha carreira. Minhas habilidades de frontend ainda são sólidas (sempre fui um hávido React developer, palestrante em meetups, fã do core-team, etc), mas encontrar tempo para construir projetos completos? Quase impossível.

Deixe-me reconhecer o óbvio: sou privilegiado aqui. Tenho anos de experiência, visão forte de produto por usar nossa planilha fitness há tempos, e a motivação de resolver meu próprio problema. Nem todo mundo começa com essas vantagens.

Mas esse é exatamente o ponto. Se a IA pode dar a alguém como eu, já sobrecarregado com responsabilidades de CPTO, esse tipo de aumento de produtividade no meu tempo limitado de programação, imagine o que pode fazer para desenvolvedores motivados em tempo integral com menos restrições.

Antes da IA, eu estava eternamente preso na esteira do "um dia vou construir essa ideia". Não porque me faltavam habilidades, mas porque me faltava tempo para a configuração tediosa, boilerplate e rabbit holes do Stack Overflow que transformam um projeto de 3 dias numa odisseia de 3 meses.

## 1. "Desenvolvedores pensam que estão mais rápidos, mas na verdade estão mais lentos"

Essa conclusão vem de estudos controlados medindo tarefas estritas, tipicamente fazendo desenvolvedores escreverem funções isoladas em condições de laboratório. Mas desenvolvimento de software real não é trabalho de laboratório.

### O Contexto da Pesquisa

Judge cita estudos mostrando que desenvolvedores são 21% mais lentos com assistência de IA. No entanto, esses estudos sofrem do que pesquisadores chamam de "viés de decomposição de tarefas". Eles medem funções individuais em vez de produtividade em nível de sistema. Um [estudo do GitHub de 2024](https://github.blog/news-insights/research/survey-ai-wave-grows/) com 95.000 desenvolvedores descobriu que, embora a conclusão de código individual possa mostrar resultados mistos, desenvolvedores usando Copilot completaram pull requests 55% mais rápido e tinham mais probabilidade de permanecer em estado de alta produtividade.

### A Diferença do Mundo Real

**Construção de Sistemas vs. Escrita de Funções:** As métricas do estudo dele perde a visão geral porque fica presa nos detalhes. Não estou apenas escrevendo funções mais rápido. Estou arquitetando sistemas inteiros mais rápido. Quando construí o app fitness, a IA me ajudou a projetar a estrutura de dados, implementar as APIs backend, criar os componentes React Native, configurar notificações push e construir gráficos personalizados, tudo simultaneamente. Nenhum estudo captura essa aceleração composta.

**Velocidade de Desbloqueio:** A desaceleração de 21% que ele mediu provavelmente reflete desenvolvedores aprendendo a usar IA efetivamente. Mas uma vez que você atinge a curva de otimização, os ganhos são exponenciais. Eu não gasto nenhum segundo no Stack Overflow agora. Zero tempo travado em "como implemento esse padrão?". IA elimina fricção cognitiva completamente.

**Qualidade Através da Iteração:** IA me permite iterar mais rápido do que é humanamente possível. Posso tentar 5 abordagens diferentes para um recurso complexo no tempo que costumava levar para implementar 1. O resultado final não é apenas mais rápido de construir. É melhor projetado.

**O Custo dos Erros:** Sim, IA sugere código errado às vezes. Mas aqui está o que os críticos perdem: capturar e corrigir erros de IA ainda é mais rápido do que escrever tudo do zero. Meu ciclo de testes está na verdade mais restritivo agora porque posso me dar ao luxo de ser mais minucioso. Cada recurso recebe testes unitários, testes de integração e verificação manual porque não preciso gaster meu tempo escrevendo boilerplate.

**O Fator Curva de Aprendizado:** A maioria dos estudos de produtividade mede desenvolvedores em suas primeiras semanas com ferramentas de IA. Pesquisa sobre adoção de tecnologia mostra que ganhos de produtividade seguem uma curva S. Há sobrecarga inicial de aprendizado, depois melhoria exponencial. Os estudos citados por Judge provavelmente capturaram desenvolvedores ainda subindo a curva de aprendizado, não aqueles que alcançaram otimização.

## 2. "Cadê a inundação de software produzido em massa?"

O raciocínio de Judge faz sentido intuitivo. Se IA realmente cria desenvolvedores 10x, não veríamos uma explosão de novos softwares? É uma pergunta justa que merece uma resposta baseada em dados. Aqui estão meus 2 cents:

### Por Que os Gráficos Dele Perdem a Revolução Real

**Software Empresarial e Interno:** A maior parte do desenvolvimento acelerado por IA acontece atrás de firewalls corporativos. Minha ferramenta de análise de agosto não vai para o GitHub. Está resolvendo problemas reais de nossa empresa. Multiplique isso por milhares de empresas onde desenvolvedores agora estão entregando ferramentas internas que eram anteriormente "caras demais" para construir.

**Qualidade sobre Quantidade:** IA não apenas permite mais apps. Permite apps melhores. Em vez de 10 projetos medíocres, estou construindo aplicações de alto nível com recursos que eu nunca teria tentado antes. Como a biblioteca de gráficos SVG customizada no meu rastreador fitness. Depois de avaliar 4 grandes bibliotecas de gráficos, IA me deu confiança para construir exatamente o que eu precisava, "na unha".

**A Revolução Oculta em Código Privado:** Além das métricas mensuráveis, existe todo um ecossistema de desenvolvimento assistido por IA acontecendo que nunca veremos em logs de commit ou app stores. Aqui estão alguns exemplos que ilustram essa tendência mais ampla:
- Um amigo finalmente usou Claude Code para criar dashboards complexos do Home Assistant em minutos que normalmente levariam dias
- A esposa de um conhecido, nem mesmo desenvolvedora, construiu dois apps privados com Cursor e automatizou parte do seu fluxo de trabalho
- Um colega numa Fortune 500 me disse que sua equipe está entregando ferramentas internas semanalmente que ficaram no backlog por anos
- Meu vizinho, um analista de dados, agora está escrevendo scripts Python para automatizar relatórios que costumavam levar horas

Esses exemplos não são prova dos ganhos de produtividade que documentei. São ilustrações de um fenômeno muito maior. Não podemos contar o código sendo gerado privadamente e dentro de empresas, mas esses ganhos invisíveis de produtividade estão transformando como as pessoas trabalham de formas que não aparecerão nos gráficos do Judge.

### Os Problemas de Medição que Ninguém Fala

**Transformação Individual de Desenvolvedor:** As métricas macro de Judge não conseguem capturar saltos pessoais de produtividade. Em 4 meses, entreguei mais código de produção do que tinha nos 2 anos anteriores combinados. Isso não é visível em números agregados de app stores.

**Variáveis de Confusão na Medição:** Minha explosão de produtividade coincidiu com o uso de IA, mas foi puramente as ferramentas? Pergunta justa. Eu também tive:
- Tempo dedicado de projeto durante minhas férias
- Visão clara de produto de anos usando nossa planilha compartilhada
- Investimento pessoal motivado em fitness tracking (venho passado por uma jornada de transformação total nos últimos dois anos, tendo resultados que nunca tive. Mas isso é papo para outro post).

No entanto, os dados do GitHub mostram que o padrão se estende além desses projetos. O aumento de produtividade persiste em todas as atividades de geração de código, não apenas projetos pessoais. As ferramentas fundamentalmente mudaram como abordo desenvolvimento.

**Velocidade para MVP:** Tempo da ideia até o protótipo funcional colapsou de semanas para dias. Meu fitness tracker foi de "planilha provisória cheia de macros mal-feitas" para um "app móvel que meus amigos realmente usam" durante alguns dias de férias. Essa aceleração não é refletida em contagens finais de apps.

**O Problema de Metodologia:** A análise de Judge assume habilidade uniforme de desenvolvedor e complexidade consistente de projeto ao longo do tempo. Mas ganhos reais de produtividade frequentemente vêm de enfrentar problemas mais difíceis mais rápido. Meus dados de commit mostram não apenas mais frequência, mas desenvolvimento de recursos mais ambiciosos por commit.

**Velocidade Empresarial:** Ferramentas internas que ficaram em backlogs por meses agora estão sendo construídas em dias. Estas não aparecem em repositórios públicos ou app stores, mas estão transformando operações empresariais.

## 3. "Alegações de marketing são hype"

Judge está absolutamente certo sobre isso. As alegações de marketing são frequentemente absurdas, e empresas usando "eficiência de IA" para justificar demissões devem ser criticadas. Mas não devemos deixar falhas de marketing nos cegar para capacidades tecnológicas genuínas.

### Onde o Marketing Erra (E Acerta)

#### Separando Hype da Realidade

**O Problema do Marketing:** Empresas prometendo "desenvolvedores 10x" da noite para o dia estabelecem expectativas impossíveis. Ganhos reais de produtividade com IA vêm de melhorias compostas em todo o ciclo de vida de desenvolvimento, não geração mágica de código.

**O Que Realmente Funciona:** IA brilha em eliminar fricção cognitiva. A sobrecarga mental de lembrar sintaxe, procurar documentação e debugar padrões comuns desaparece. Não está substituindo julgamento humano; está amplificando criatividade humana.

**Evidência de Qualidade:** No meu app fitness, IA não apenas me ajudou a escrever mais código. Me ajudou a escrever código melhor. Minha biblioteca de gráficos SVG customizada está mais limpa e de fácil manutenção. IA me deu paciência e velocidade para fazer as coisas certas na primeira vez.

## 4. "Se existissem engenheiros 10x, veríamos prova nos gráficos"

Não necessariamente. Produtividade nem sempre aparece em produção bruta de software público em massa. Em vez disso, aparece como:

- Projetos pessoais finalmente se tornando realidade (meu caso).
- Acelerações internas (projetos que nunca teriam sido aprovados agora são viáveis).
- Desenvolvedores gastando mais tempo em pensamento de produto/design em vez de boilerplate de baixo valor.

Esse último ponto é crucial. IA está mudando a definição do que significa "ser produtivo."

## O Futuro do Trabalho de Desenvolvimento

<div style="margin: 2rem 0;">

![Como IA Transforma a Alocação de Tempo do Desenvolvedor](/images/developer-time-allocation.png)

*Minha hipótese sobre como IA transforma a alocação de tempo do desenvolvedor, baseada na minha experiência e observações do cenário de desenvolvimento em evolução.*

</div>

### Minha Visão do Desenvolvedor Potencializado por IA

O futuro não é sobre afogar o mundo em clones mal feitos. É sobre mudar o tempo do desenvolvedor para trabalho de maior ROI:

- Escrever melhores PRDs e definições de produto.
- Moldar listas de tarefas e designs de sistema mais limpos.
- Revisar, refinar e manter código em nível estratégico, enquanto IA lida com scaffolding e repetição.

Eu não apenas codifico mais. Eu construo mais.

## O Desafio: Prove que Estou Errado (Ou Certo)

Aqui está o que desafio qualquer cético a fazer:

1. **Acompanhe sua performance atual**: Documente sua produtividade atual por 2 semanas. Commits, recursos entregues, tempo para conclusão.
2. **Aprenda ferramentas de IA adequadamente**: Não apenas use ChatGPT para debugging. Domine um ambiente de codificação IA adequado como Claude Code, Cursor ou GitHub Copilot.
3. **Dê 4 semanas**: Passada a curva de aprendizado, entrando na zona de otimização.
4. **Meça novamente**: Mesmas métricas, mesmo tipo de projetos.

Isso é um conjunto de dados: o meu. Estou compartilhando não como prova universal, mas como convite. O desafio real agora é para mais desenvolvedores executarem experimentos similares e compartilharem seus resultados. Quer você veja ganhos ou não, documente. A revolução acontece quando construímos um corpo compartilhado de evidências, não quando argumentamos a partir de anedotas.

## A Conclusão

Se você não vê ganhos imediatamente, isso pode dizer mais sobre onde você está na curva de adoção do que sobre as ferramentas em si. Como qualquer mudança tecnológica, há um período de aprendizado. A ausência de uma inundação de softwares de baixa qualidade não refuta produtividade. Apenas significa que o futuro não está distribuído uniformemente ainda.

Esse não é a primeira vez que vemos esse padrão. Quando calculadoras chegaram, matemáticos se preocuparam em perder habilidades de aritmética mental. Quando IDEs introduziram o autocomplete, puristas alegaram que programadores reais digitavam tudo. Quando Stack Overflow foi lançado, veteranos zombaram de codificação copiar-colar. Cada ferramenta enfrentou ceticismo, depois se tornou indispensável.

Estamos no início de uma transformação. Em breve, vamos olhar para trás em 2025 e rir da ideia de que codificação com IA "não funcionava". Para aqueles de nós já aproveitando, a revolução está aqui.

## O Que Vem a Seguir: Meu Playbook de Codificação com IA

<div style="margin: 2rem 0;">

![Meu Fluxo de Trabalho de Desenvolvimento Potencializado por IA](/images/ai-workflow-diagram.png)

</div>

Este post é apenas o começo. O fluxo de trabalho acima mostra exatamente como sistematicamente transformo ideias em código entregue. Nas próximas semanas, vou mergulhar fundo em cada etapa:

- Como fazer brainstorm e moldar problemas com GPT-5 para máxima clareza
- Escrever documentos de definição que se tornam o guia principal
- Auto-gerar PRDs que IA pode realmente executar
- Criar listas de tarefas atômicas onde uma checkbox = um commit
- Manter IA consciente do contexto durante todo o ciclo de desenvolvimento

Essa é minha experiência até agora. Ainda estou aprendendo e descobrindo novas formas de trabalhar com IA todos os dias. Nem toda jornada será igual, mas espero que compartilhar meus dados e métodos ajude você a encontrar seu próprio caminho com essas ferramentas.