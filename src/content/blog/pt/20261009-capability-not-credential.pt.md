---
author: Hugo Nogueira
pubDatetime: 2026-10-09T08:00:00.000Z
title: "Uma Capability, Não uma Credencial: Como Nossos Agentes de IA Chamam APIs de Clientes Sem Nunca Segurar uma Chave"
locale: pt
postSlug: capability-not-credential
featured: true
draft: false
tags:
  - ai-agents
  - security
  - agent-infrastructure
  - code-mode
  - engineering
description: "Nossos agentes de IA escrevem e executam código contra o GitHub, a AWS e outros sistemas dos clientes a partir de um sandbox com acesso à internet, e nada dentro desse sandbox consegue se autenticar em nenhum deles. A arquitetura por trás disso, os designs que deixamos de lado e o que ela deliberadamente não protege."
keywords: Hugo Nogueira, agentes de IA, segurança de agentes, code mode, isolamento de credenciais, capability, prompt injection, sandbox, egress, OAuth, IA corporativa, infraestrutura de agentes
image: "/images/blog/capability-not-credential.jpg"
---

Nos últimos meses, os agentes de IA que rodamos na Complyance passaram a escrever e executar código contra os sistemas dos próprios clientes: organizações no GitHub, contas AWS, provedores de identidade e repositórios de documentos. Eles fazem isso a partir de um sandbox que tem acesso à internet. Nada dentro desse sandbox consegue se autenticar em nenhum desses sistemas.

Levamos um tempo para acertar essa combinação, e acho que o padrão por trás dela vai importar para qualquer pessoa que deixa agentes agirem sobre infraestrutura real. A ideia central cabe em uma frase: **o agente recebe uma capability, não uma credencial.** Este post explica o que isso significa na prática, os designs que deixamos de lado no caminho e o que a abordagem não protege, que é a parte que eu leria primeiro se estivesse avaliando o design de outra pessoa.

## Por que nossos agentes escrevem código

Nossos agentes coletam evidências de compliance. Um pedido como "mostre que a proteção de branch está ativa em todos os repositórios de produção" parece simples. Na prática, significa percorrer centenas de repositórios através de uma API com milhares de endpoints. Uma conta AWS pode devolver 1.247 hosts para uma única pergunta de inventário.

Tools tipadas, uma função por operação, sofrem nessa escala. Nenhum modelo consegue manter mil descrições de tools em mente, e todo resultado intermediário precisa passar pela janela de contexto. Por isso migramos para o que hoje se chama de code mode. O agente recebe um sandbox, uma referência curta para cada sistema conectado e uma pequena biblioteca cliente, e escreve um script que faz o loop e a filtragem sozinho. Só o resumo volta para o contexto. Os modelos são muito melhores escrevendo vinte linhas de Python contra uma API do que orquestrando duzentas chamadas de tools.

## O problema de deixar uma chave na sala

Simon Willison descreve uma ["tríade letal"](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) para agentes: acesso a dados privados, exposição a conteúdo não confiável e um jeito de mandar dados para fora. Um agente em code mode tem as três por design. Ele passa o dia lendo texto escrito por outras pessoas, executa código, e o sandbox dele acessa a internet porque trabalho útil muitas vezes precisa disso.

Coloque uma credencial nesse ambiente e um único prompt injection, escondido na descrição de um pull request que o agente por acaso leia, pode gerar um script que imprime o token e manda para algum lugar. Treinamento e prompts melhores deixam isso menos provável. Não deixam impossível, porque o modelo é justamente o componente com quem o atacante está conversando. A resposta robusta é estrutural: garantir que não exista nada no sandbox que valha a pena roubar.

## Três designs que deixamos de lado

![Quatro formas de deixar um agente chamar a API de um cliente: token no ambiente, token de curta duração com escopo, tools tipadas ou um servidor MCP, e um broker de capabilities](/images/blog/capability-not-credential/fig1-where-the-secret-lives.png)

A primeira versão do nosso protótipo guardava um token no processo da tool e o anexava a cada chamada. Funcionava, e é exatamente o cenário que a tríade explora. Tudo o que o sandbox consegue ler, um script injetado também consegue.

A versão mais cuidadosa entrega ao sandbox um token de curta duração, com escopo limitado ao que o run precisa. Isso reduz o raio de impacto, mas nossas próprias notas de design deixam a limitação clara: o token continua "legível e utilizável durante toda a sua vida útil". Quinze minutos é tempo de sobra para um código que já está rodando, e privilégio mínimo para um agente de evidências ainda significa acesso de leitura à organização inteira do cliente no GitHub.

Tools tipadas, ou um servidor MCP que guarda os segredos, de fato mantêm as credenciais fora do sandbox. Mas também eliminam o code mode, e toda resposta volta passando pelo modelo. Queríamos as duas coisas ao mesmo tempo: a expressividade do código, com as credenciais tratadas inteiramente fora do sandbox.

## Capability, não credencial

![Três zonas de confiança: um sandbox não confiável que guarda só uma capability, um broker confiável com acesso de curta duração e um gateway de credenciais com os segredos de longa duração](/images/blog/capability-not-credential/fig2-three-trust-zones.png)

O design divide o trabalho em três zonas, cada uma com uma regra rígida sobre o que pode guardar.

O **sandbox** é não confiável por definição. É um container com gVisor, sistema de arquivos raiz somente leitura e acesso à internet. Quando um run começa, ele recebe um stub cliente de umas cem linhas, um token de capability para aquele run e uma referência curta para cada sistema que o cliente conectou. Chamar o GitHub de um cliente fica assim:

```python
from broker import connect

gh = connect(connection_id)
rules = gh.get("/repos/acme/app/branches/main/protection")
```

Não existe chave nesse código, no ambiente ou em disco. O stub conhece um endereço e um token.

O **broker** roda no nosso worker confiável. Ele recebe a chamada, decide se este run pode fazê-la e, se puder, carrega a conexão salva do cliente, descriptografa, assina a requisição e devolve apenas a resposta.

O **gateway de credenciais** fica um passo mais atrás e guarda os segredos de longa duração, como refresh tokens de OAuth. O broker pede a ele um access token de curta duração e nunca vê o refresh token. O refresh acontece sob um lease no Postgres, um escritor por vez. Parece um detalhe pequeno até você encontrar um provedor com refresh tokens de uso único, em que dois workers fazendo refresh ao mesmo tempo quebram a conexão em silêncio.

Cada zona responde de um jeito diferente à pergunta "o que isso poderia vazar?". O sandbox poderia vazar uma capability que expira junto com o run. O broker poderia vazar access tokens das conexões que está atendendo naquele momento. Só o gateway guarda segredos que duram, e nada que executa código escrito pelo modelo chega perto dele.

## O que acontece em cada chamada

![As quatro verificações em cada chamada: o run está vivo, a conexão está no grant, a requisição está bem formada, e então descriptografar, assinar e enviar](/images/blog/capability-not-credential/fig3-every-call.png)

Um diagrama como o de cima é fácil de desenhar e fácil de errar nos detalhes. Quatro decisões carregam a maior parte do peso.

**A autoridade fica presa a uma conexão, não a um destino.** Muitos proxies de egress anexam credenciais de acordo com o destino do tráfego, o que na prática deixa o agente escolher uma credencial ao escolher um host. No nosso design, o agente informa uma conexão, e o broker decide se este run pode usá-la. Para AWS e GCP, o agente informa só o nome do serviço, validado contra um padrão rígido, e o broker monta o host e assina a requisição do lado dele.

**O grant é congelado no início do run.** Nesse momento o broker tira um snapshot das conexões que este agente pode usar, e toda chamada é verificada contra ele. Mudar configurações no meio do run pode restringir runs futuros, mas nunca amplia o atual. A lista que o agente recebe é uma conveniência; o snapshot é o que de fato vale.

**As capabilities morrem com o run.** O token é revogado quando o sandbox é liberado. Os clientes autenticados ficam em cache por run, e não globalmente, então a revogação descarta esses clientes também.

**A fronteira é física, além de lógica.** Regras de rede dão ao sandbox exatamente um caminho até a zona confiável, terminando em um terminador no host. A identidade de mutual TLS que o broker exige mora ali, fora de qualquer container, então um sandbox que encontre a porta do broker diretamente ainda não consegue completar o handshake. E quando algo falha, o sandbox recebe um erro fixo em vez da mensagem bruta do upstream, porque mensagens de erro de bibliotecas de autenticação costumam conter exatamente o que você estava tentando proteger.

## O que isso não protege

![O que a fronteira protege: credenciais sim; dados do cliente, escritas e respostas com formato de credencial não](/images/blog/capability-not-credential/fig4-what-it-protects.png)

Ela protege credenciais, não dados. Tudo o que o broker devolve cai em um sandbox com acesso à internet, então um agente comprometido por injection ainda poderia mandar uma lista de repositórios para algum lugar. O atacante sai com um retrato do momento, e não com as chaves para voltar depois. É uma redução real de risco, mas não é prevenção de vazamento de dados.

Ela também não deixa o agente somente leitura. Não existe uma allow-list de métodos HTTP, em parte porque muitos provedores expõem leituras por endpoints de busca via `POST`. O comportamento somente leitura vem das instruções do agente e de os clientes conectarem credenciais somente leitura, o que recomendamos mas não conseguimos impor. Eu descreveria o design atual como seguro para credenciais, e não seguro para efeitos colaterais.

O limite mais sutil é que um broker de credenciais herda todos os endpoints que suas credenciais alcançam, inclusive aqueles cuja resposta já é uma credencial. A maioria das APIs grandes tem esse tipo de endpoint: troca de tokens, assunção de roles, cofres de segredos, rotas que autenticam como a própria integração em vez de como o cliente. O cliente HTTP dentro do broker também faz parte da superfície de ataque. Conveniências de SDK, como objetos de opções que podem sobrescrever a URL de destino, ou hooks de autenticação que trocam de identidade dependendo da rota, são inofensivas quando o seu código as chama e arriscadas quando os argumentos vêm de um agente. Se você for construir algo assim, faça duas perguntas cedo. O agente consegue ver o token? E existe alguma requisição cuja resposta seja um token? Bloqueie as rotas que emitem credenciais, e nunca passe input do agente direto para a configuração do cliente.

## Princípios

Tirando nossas especificidades, é isto que eu levaria para qualquer sistema em que agentes chamam APIs reais em nome de outra pessoa:

1. **Assuma que o agente é o atacante.** Os modelos não são maliciosos, mas leem conteúdo escrito por pessoas que podem ser.
2. **Entregue capabilities, não credenciais.** O que entra no sandbox deve ser inútil fora do run que o criou.
3. **Prenda a autoridade a conexões, não a destinos.**
4. **Congele os grants quando o run começa.** Mudanças podem restringir o acesso durante um run, nunca ampliar.
5. **Mantenha os segredos de longa duração a dois passos do código escrito pelo modelo.**
6. **Trate endpoints e bibliotecas cliente como parte da fronteira.**
7. **Seja explícito sobre o que você não protege.** Credenciais, dados e efeitos colaterais são três problemas diferentes.

## Perguntas em aberto

Alguns problemas ainda me parecem em aberto.

O egress de dados é o mais óbvio. Tirar o acesso à rede dos runs que só precisam de APIs intermediadas pelo broker fecha a tríade por completo, mas parte do trabalho legítimo precisa da internet aberta. Políticas de egress por agente são o meio-termo provável, e a parte difícil é mantê-las precisas sem que virem um fardo de manutenção.

Escritas vêm logo depois. Coletar evidências é quase só leitura, enquanto a próxima geração de agentes de compliance vai remediar: abrir o pull request, rotacionar a chave, fechar o ticket. Um modelo de capabilities para escritas precisa de intenção declarada, aprovação humana para o subconjunto arriscado e uma trilha de auditoria que o time de segurança do cliente aceite.

Por fim, proveniência. Hoje o registro do que um agente fez vive no log do run. O que os times de segurança pedem cada vez mais é um registro independente na própria fronteira, mostrando qual run, qual conexão, qual endpoint e o que voltou. Imagino que isso vire requisito padrão para agentes que tocam sistemas de produção.

---

Eu sempre volto à mesma conclusão neste blog: o modelo não é a fronteira de segurança, o sistema ao redor dele é. A coisa mais útil que uma plataforma de agentes pode fazer é tornar impossível, e não apenas improvável, a versão perigosa de um erro. Uma capability no lugar de uma credencial é uma forma pequena e concreta de fazer isso, e eu adoraria trocar ideias com quem está traçando a mesma linha.

*Me encontre no [LinkedIn](https://linkedin.com/in/hugomn) ou em [hello@hugo.im](mailto:hello@hugo.im).*
