---
layout: ../../layouts/Page.astro
title: "Pesquisa e Projetos"
slug: "projects"
description: "Benchmarks, datasets e código abertos do trabalho de Hugo Nogueira com agentes de IA em produção, além das empresas e ventures que ele ajudou a construir."
---

A maior parte do que aprendo sobre agentes vem de rodá-los em produção, e, quando posso, transformo isso em algo que outras pessoas possam verificar e reaproveitar. Tudo abaixo é público, com a metodologia documentada, inclusive as partes que não funcionaram.

## Pesquisa aberta

### LHC: um benchmark de coerência de longo prazo para agentes (2026)

Um benchmark aberto que mede se modelos da classe 8B conseguem manter estado, compromissos e trabalho pela metade ao longo de grandes trechos de contexto não relacionado. São 24 tarefas curadas à mão em três modos de falha, cada uma rodada em quatro condições de gap, com uma matriz de decisão travada antes de qualquer modelo ser avaliado. O release também inclui um parser determinístico de cerca de oitenta linhas de Python, que acabou sendo um bom piso para tarefas de estado estruturado, e o diário completo de um fine-tune que não superou de forma mensurável o modelo base. Publiquei esse resultado, e não o modelo.

[Dataset no Hugging Face](https://huggingface.co/datasets/hugonogueira/lhc-v0.2) · [Código](https://github.com/hugomn/lhc) · [Parser baseline](https://github.com/hugomn/lhc-resume-state-parser) · [Artigo](/pt/posts/lhc-v02-long-horizon-coherence-benchmark/)

### Como agentes falham em produção: MAST com telemetria real (2026)

A maior parte da pesquisa sobre falhas estuda tarefas de benchmark. Apliquei a taxonomia MAST a 639.381 passos de execução em 23.624 runs de uma plataforma de agentes em closed alpha, ao longo de cinco meses. O resultado mais útil foi metodológico: o meu primeiro achado principal era um bug de infraestrutura que parecia comportamento do agente. O código e os resultados agregados são públicos, e todos os números do artigo podem ser reproduzidos a partir deles.

[Código e resultados](https://github.com/hugomn/mast-taxonomy-production-telemetry) · [Artigo](/pt/posts/mast-production-agent-failures/)

## Sistemas de produção sobre os quais escrevo

Na Complyance construí o runtime em que nossos agentes de compliance rodam, e um broker que permite que eles chamem o GitHub, a AWS e outros sistemas dos clientes a partir de um sandbox que nunca guarda uma credencial. Esse código não é aberto, então escrevo sobre a arquitetura com o máximo de detalhe que posso:

- [Uma Capability, Não uma Credencial](/pt/posts/capability-not-credential/), sobre isolamento de credenciais para agentes que escrevem e executam código
- [O problema da centésima chamada de tool](/pt/posts/100th-tool-call-problem/), sobre durabilidade para agentes de longa duração
- [O harness de agentes](/pt/posts/agent-harness-infrastructure/), sobre o sistema ao redor do modelo

## Empresas e ventures

- **Complyance** (2022 até hoje). CPTO e primeiro funcionário da empresa. Uma plataforma de GRC nativa em IA usada por empresas da Fortune 500, com uma Série A liderada pela GV.
- **BCG Digital Ventures**. Venture CTO em mais de oito ventures, incluindo a Tilda, um aplicativo de terapia digital certificado como DiGA, e a Tenera, machine learning para concorrências da construção civil.
- **finleap**. Engineering lead de uma venture de banking para PMEs construída sob os requisitos do BaFin e de KYC.
- **meuingresso.com**. Cofundador. Venda de ingressos self-service no Brasil, adquirida em 2018. [A história](/pt/posts/my-first-exit/).

Mais código no meu [GitHub](https://github.com/hugomn).
