---
author: Hugo Nogueira
pubDatetime: 2026-01-27T08:00:00.000Z
title: "O Problema da 100ª Chamada: Por Que a Maioria dos Agentes de IA Falha em Produção"
locale: pt
postSlug: building-durable-agents
featured: true
draft: false
tags:
  - agentes-ia
  - sistemas-autonomos
  - producao
  - durabilidade
  - engenharia
description: Demos rodam por minutos. Produção roda por horas. Aqui está o que quebra, e os padrões de durabilidade que realmente funcionam quando seu agente precisa fazer mais de 200 chamadas de ferramenta sem perder o rumo.
keywords: Hugo Nogueira, agentes IA, agentes duráveis, agentes em produção, sistemas autônomos, checkpointing, confiabilidade de agentes, engenharia de IA
image: "/images/blog/building-durable-agents.jpg"
---

Mês passado, um agente que construí rodou de forma autônoma por 1 hora e 40 minutos. Fez 369 chamadas de ferramenta, consumiu 9.7 milhões de tokens, realizou 57 buscas na web, leu 65 arquivos e produziu 30 documentos estruturados. Custo total: $2.74.

Era uma tarefa de síntese de pesquisa: analisar tendências emergentes em um domínio técnico, cruzar fontes, avaliar oportunidades e produzir relatórios estruturados. Trabalho que levaria vários dias para um analista humano.

Mas aqui está a parte que não menciono nas demos: o agente também bateu nos limites de contexto duas vezes, teve que se recuperar de um checkpoint corrompido uma vez, e quase publicou uma análise incompleta antes de um guardrail barrar.

Essa é a realidade dos agentes em produção que ninguém comenta nas conferências.

## O Abismo Entre Demo e Produção

Toda demo de agente parece impressionante. O apresentador digita um prompt, o agente encadeia algumas chamadas de ferramenta, e a mágica acontece. A plateia aplaude.

Mas demos rodam por minutos. Produção roda por horas. E em algum ponto entre o minuto 5 e a hora 5, tudo que pode dar errado dá.

Eu chamo isso de **Problema da 100ª Chamada**. Não porque a falha acontece exatamente na chamada 100, mas porque a degradação é inevitável quando uma tarefa ultrapassa uma única janela de contexto.

Aqui está o que realmente quebra:

**Estouro da Janela de Contexto**: Seu agente começa com uma missão clara. 50 chamadas de ferramenta depois, o contexto está lotado de resultados, raciocínio intermediário e mensagens de erro. O modelo começa a resumir. Detalhes críticos são comprimidos. O agente "esquece" algo essencial.

**Corrupção de Estado**: O agente tomou uma decisão 30 minutos atrás baseado em informação que agora está desatualizada. Ou pior, fez uma suposição que parecia razoável na hora mas contradiz o que aprendeu desde então.

**Falhas em Cascata**: Uma API dá timeout. O agente tenta de novo. A nova tentativa retorna dados diferentes. Agora o agente está raciocinando sobre informação inconsistente, e cada decisão subsequente amplifica a confusão.

**Degradação Silenciosa**: O modo de falha mais assustador. O agente continua rodando, continua produzindo output, mas a qualidade vai caindo silenciosamente. Você só percebe quando um cliente reclama ou uma auditoria falha.

## Os Padrões de Durabilidade Que Realmente Funcionam

Depois de meses rodando agentes em produção, tanto para trabalho corporativo quanto para automação pessoal, convergi em um conjunto de padrões que fazem a diferença entre "demo impressionante" e "sistema confiável."

### 1. Execução Consciente de Recursos: Agentes Que Sabem Quando Encerrar

A maioria dos agentes roda até bater numa parede. Aí eles travam, ou produzem lixo, ou estouram seu orçamento.

O padrão melhor: **fazer o agente consciente do seu próprio consumo de recursos**. Não apenas impondo limites de fora, mas dando ao agente visibilidade de quanto fôlego ainda tem.

```python
class StepTracker:
    """Rastreia passos de execução e injeta consciência nos resultados das ferramentas."""

    def __init__(self, max_steps: int = 500):
        self.max_steps = max_steps
        self.current_step = 0

    def format_status(self) -> str:
        """Anexa a cada resultado de ferramenta para o agente ver seu progresso."""
        remaining_pct = (self.remaining / self.max_steps * 100)

        base = f"[Passo {self.current_step}/{self.max_steps}]"

        if remaining_pct <= 10:
            return f"{base} ⚠️ CRÍTICO: {self.remaining} passos restantes - encerre agora"
        elif remaining_pct <= 20:
            return f"{base} ⚠️ Poucos passos restantes - considere finalizar a tarefa atual"
        return base
```

A sacada aqui: em vez de simplesmente cortar o agente quando ele bate num limite, cada resultado de ferramenta inclui a contagem atual de passos. O agente _vê_ ele mesmo se aproximando do limite e pode planejar de acordo. "Tenho 50 passos restantes, então devo priorizar as verificações mais importantes e deixar o secundário para depois."

É uma mudança sutil mas crucial de restrição externa para consciência interna.

### 2. Checkpointing com Camadas de Visibilidade

Todo mundo sabe que você deve salvar estado constantemente. Mas a maioria das implementações perde uma dimensão crítica: **nem todo estado é igual**.

Quando um agente roda por horas, você está salvando milhares de mensagens, chamadas de ferramenta e resultados intermediários. Parte disso é essencial para recuperação. Parte é essencial para debugging. Parte nunca deveria ser mostrada para usuários. E parte só é relevante para o rastro de auditoria.

Eu uso metadados de visibilidade em cada checkpoint:

```python
class CheckpointVisibility:
    """Classifica para que serve cada pedaço de estado."""

    VISIBLE = "visible"           # Mostrar para usuários finais
    USER_HIDDEN = "user_hidden"   # Mostrar para operadores, não usuários
    ALWAYS_HIDDEN = "always_hidden"  # Apenas interno (prompts de sistema, etc.)

    def classify_message(self, message) -> str:
        if message.type == "system":
            return self.ALWAYS_HIDDEN
        elif message.type == "tool":
            return self.USER_HIDDEN  # Usuários não precisam do output bruto
        elif message.type == "ai" and has_tool_calls(message):
            return self.USER_HIDDEN  # Esconder os passos de "raciocínio"
        return self.VISIBLE
```

Parece algo pequeno, mas é transformador para sistemas em produção. Você ganha:

- **Trilhas de auditoria limpas** que mostram decisões, não detalhes de implementação
- **Capacidade total de debugging** quando algo dá errado
- **Logging pronto para compliance** que separa dados de usuário de internos do sistema

### 3. Correlation IDs em Todo Lugar

Quando um agente roda por quase duas horas e faz 369 chamadas de ferramenta, algo vai dar errado. A pergunta é: você consegue rastrear exatamente o que aconteceu?

Toda operação nos meus agentes carrega um correlation ID que atravessa toda a execução:

```python
class AuditLogger:
    def log_evaluation(self, cycle_number, decisions_count, ...) -> str:
        """Registra um ciclo de avaliação e retorna o correlation ID."""
        correlation_id = str(uuid.uuid4())

        self.log(
            event_type=AuditEventType.EVALUATION_COMPLETED,
            event_data={
                'cycle_number': cycle_number,
                'decisions_count': decisions_count,
            },
            correlation_id=correlation_id,
            tokens_used=tokens_used,
            cost_usd=cost_usd,
        )

        return correlation_id  # Passar para todas as operações subsequentes
```

Quando um usuário pergunta "por que o agente fez X?", eu consigo consultar pelo correlation ID e obter a cadeia completa: o que disparou o ciclo, qual contexto o agente tinha, o que ele decidiu, quais ferramentas chamou, e quais foram os resultados.

Isso é requisito básico para deploys enterprise, mas vejo faltando na maioria dos frameworks de agentes.

### 4. Human-in-the-Loop como Interrupções de Grafo

A implementação ingênua de HITL: checar uma flag antes da execução da ferramenta, mandar uma requisição para algum lugar, fazer polling pela resposta.

O problema: isso quebra o modelo de execução do agente. Agora você está gerenciando estado através de uma fronteira assíncrona, lidando com timeouts, tratando race conditions.

O padrão melhor: tratar aprovação humana como uma **interrupção de grafo**. A execução do agente pausa em um ponto semanticamente significativo, a interrupção captura exatamente o que precisa de aprovação, e a retomada restaura o contexto completo.

```python
def with_approval_check(tool_guardrails, tool_name):
    """Decorator que envolve ferramentas com aprovação baseada em interrupção."""

    async def wrapper(*args, **kwargs):
        # Isso não é um check de flag, é uma interrupção de grafo
        approval_response = interrupt({
            "request_id": f"approval-{uuid.uuid4().hex[:8]}",
            "tool_name": tool_name,
            "tool_args": kwargs,
            "message": f"Ferramenta '{tool_name}' requer aprovação."
        })

        if not approval_response.get("approved"):
            return {"success": False, "error": "Rejeitado pelo usuário"}

        return await original_function(*args, **kwargs)

    return wrapper
```

A interrupção não é só sobre "pedir permissão." Ela captura o estado exato no ponto de decisão. Quando o humano aprova e o grafo retoma, o agente continua com contexto completo, sem necessidade de reconstruir estado.

### 5. Budget Guardrails: Restringir Antes de Confiar

Agentes são otimistas. Eles vão continuar tentando até conseguir ou esgotar todos os recursos que você der.

Budget guardrails são restrições inegociáveis que forçam o agente a parar e reportar em vez de espiralar para território caro:

```python
class BudgetGuardrails:
    def __init__(self, daily_limit=None, hourly_limit=None, per_call_limit=None):
        self.daily_limit = daily_limit
        self.hourly_limit = hourly_limit
        self.per_call_limit = per_call_limit

    def check_budget(self, estimated_cost: float) -> tuple[bool, str | None]:
        if self.per_call_limit and estimated_cost > self.per_call_limit:
            return False, f"Excede limite por chamada ${self.per_call_limit}"

        if self.hourly_limit and (self.hourly_spent + estimated_cost) > self.hourly_limit:
            return False, f"Excederia limite por hora ${self.hourly_limit}"

        if self.daily_limit and (self.daily_spent + estimated_cost) > self.daily_limit:
            return False, f"Excederia limite diário ${self.daily_limit}"

        return True, None
```

O insight chave: checar _antes_ da chamada com custo estimado, não só depois. Você quer impedir a operação cara, não só registrar que ela aconteceu.

## Testando Agentes Duráveis

Não dá para testar durabilidade com testes unitários. Você precisa de caos.

Minha abordagem de testes:

1. **Simulações de longa duração**: Deixar o agente rodar por horas em tarefas realistas. Medir degradação ao longo do tempo.

2. **Injeção de falhas**: Falhar chamadas de ferramenta aleatoriamente, injetar latência, corromper respostas. Ver como o agente se recupera.

3. **Testes de corrupção de estado**: Corromper checkpoints manualmente e verificar comportamento de recuperação.

4. **Testes de exaustão de budget**: Definir limites muito baixos e verificar se o agente para graciosamente em vez de travar.

5. **Regressão em incidentes reais**: Cada falha em produção vira um caso de teste.

O objetivo não é provar que o agente funciona. É descobrir como ele falha.

## O Fosso da Infraestrutura

Vou ser direto: **o LLM é commodity. A camada de orquestração é o fosso.**

Já temos modelos que raciocinam brilhantemente. O que não temos é infraestrutura que os mantém rodando de forma confiável por horas, dias, semanas.

Os agentes que vão importar em 2026 não serão os mais inteligentes. Serão os que:

- Sabem quando estão ficando sem recursos e encerram graciosamente
- Mantêm trilhas de auditoria completas que humanos conseguem de fato entender
- Interrompem para aprovação nos momentos certos sem perder contexto
- Se recuperam de falhas sem corromper estado

Os times que vão vencer serão os que tratam infraestrutura de agentes como tratam infraestrutura de banco de dados, com o mesmo rigor em torno de durabilidade, consistência e recuperação.

O modelo que você usa vai ser requisito básico. A orquestração que você constrói em volta dele vai ser o diferencial.

---

_Estou construindo agentes para trabalho enterprise e rodando agentes autônomos para produtividade pessoal. Se você está enfrentando desafios com agentes em produção, adoraria saber quais padrões descobriu. Me encontre no [LinkedIn](https://linkedin.com/in/hugomn) ou [X](https://x.com/hugomn)._
