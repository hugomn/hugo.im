---
author: Hugo Nogueira
pubDatetime: 2020-06-30T00:00:00.000Z
title: "Uma olhada rápida na stack do hey.com"
locale: pt
postSlug: a-brief-look-at-heycom-stack
featured: false
draft: false
image: /images/20200630.jpg
tags:
  - technology
  - ruby-on-rails
  - inspiration
  - stack
description: Uma exploração da stack tecnológica e infraestrutura por trás do serviço de email Hey da Basecamp, incluindo Ruby on Rails, Kubernetes e seu fluxo de desenvolvimento.
---

Há duas semanas atrás, a empresa Basecamp, lançou seu próprio serviço de e-mail que tem como objetivo desafiar as funcionalidades dos principais e-mails online, chamado Hey (e que reside no atrativo e-mail hey.com). O lançamento foi anunciado no dia 15 de junho, pelo o CEO e co-founder da empresa, Jason Fried, através de um tweet:

<br/>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Two years of work comes alive today. Couldn't be more proud of our team. It wasn't easy, but it was incredibly fun. And today we get to show the world what we've been working on. Email's new heyday is here. HEY: <a href="https://t.co/Qyp1WsIIly">https://t.co/Qyp1WsIIly</a></p>&mdash; Jason Fried (@jasonfried) <a href="https://twitter.com/jasonfried/status/1272533092939505664?ref_src=twsrc%5Etfw">June 15, 2020</a></blockquote>

A plataforma, que foi inicialmente disponibilizada através de convites, gerou excitação em entusiastas de tecnologia, por trazer uma diferente abordagem ao tão comum serviço de e-mail: já na entrada, nos deparamos com a "Imbox" (com M mesmo, de IMportante), caixa de entrada que utiliza inteligência artificial para separar e-mail autorizados, newsletters e até um "paper-trail" onde recibos e comprovantes serão armazenados.

Um ponto interessante a ser notado por tecnologistas: [hey.com](http://hey.com) está longe de ser um MVP como temos visto em outras startups. A ferramenta foi desenvolvida por dois anos até seu lançamento, e seu versão inicial já oferece ferramentas avançadas como habilidade de mesclar threads de e-mail, notificações para contatos específicos, etc. Além disso, o serviço não é gratuito: oferece uma versão trial por 14 dias, e após disso, é cobrada uma taxa única de $99 por ano.

Porém, o ponto que mais intrigou durante a semana foi tentar entender a stack e a infraestrutura por trás do hey.com. Por ter sido lançado pela Basecamp, conhecida pela qualidade de software e desenvolvimento ágil, certamente ali havia algo interessante.

Numa respostas ao tweet de Jason Fried, o CTO David Hainemeier fez uma piada com tecnologias em hype, deixando óbvio que [hey.com](http://hey.com) usa uma stack simples, e obviamente com Ruby on Rails:

<br/>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Went with a serverless, microservices architecture on the backend based on Go, Rust, and Flubber, paired with a nanoservices frontend, mixing react, redux, vuejs, and actually angular together for a best in breed combination ✌️</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/status/1225506212265037827?ref_src=twsrc%5Etfw">February 6, 2020</a></blockquote>

Infelizmente, [hey.com](http://hey.com) não é código livre, então eu tive que investigar um pouco pra ter uma idéia melhor das tecnologias utilizadas.

Aviso importante: como o código do [hey.com](http://hey.com) não é livre, e não foi feito nenhum anúncio oficial, as afirmações que eu faço aqui são todas baseadas em informações de redes sociais e na análise superficial que fiz do html do plataforma.

## Aplicação web

Como podíamos imaginar, [hey.com](http://hey.com) é uma aplicação web Ruby on Rails renderizada no servidor, sem utilizar nenhum framework front-end no lado do cliente (como React, Vue). Ao inspecionar o código, de cara esbarramos com [turbolinks](https://github.com/turbolinks/turbolinks), uma biblioteca para navegação de páginas sem a necessidade de recarregar todo o HTML, e que proporciona uma navegação bastante rápida:

![Turbolinks in hey.com code](/images/20200630_web.png "Turbolinks")

Eu não vou me aprofundar muito na aplicação Ruby on Rails do [hey.com](http://hey.com) aqui, mas se você tiver interesse, o Matouš Borák fez um artigo bastante aprofundado [aqui](https://dev.to/borama/a-few-sneak-peeks-into-hey-com-technology-i-intro-4bjg).

## Infraestrutura

No que diz respeito à infra-estrutura da aplicação, David Hainemeier explicou que escolheram Kubernetes para orquestrar os contâiners da aplicação. Questionado sobre a real necessidade da ferramenta, DHH argumenta que para ferramentas como o Hey, em que não se sabe se 10 ou 1 milhão de usuários se cadastrarão na plataforma, um orquestrador como Kubernetes é extremamente necessário:

<br/>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Because the cloud is actually a great place to run a product where you have no idea whether 10 people and a dustbowl shows up or if half a million people suddenly wants in. Uncertain scale = great fit. (And K8S is a great way to run cloud).</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/status/1226252386252947456?ref_src=twsrc%5Etfw">February 8, 2020</a></blockquote>

Ainda sobre instraestruture, Blake Stoddard, Senior System Administrator no Basecamp, escreveu [neste artigo](https://m.signalvnoise.com/seamless-branch-deploys-with-kubernetes/) de 20 de abril de 2020, que para gerenciar seus clusters, utilizam o EKS da Amazon, para automatizar a execução do Kubernetes.

## Fluxo de desenvolvimento

Inspirado no [sistema "branch-lab" do GitHub](https://github.blog/2015-06-02-deploying-branches-to-github-com/), o time de desenvolvimento do [hey.com](http://hey.com) utiliza um sistema que imediatamente provisiona qualquer branch em um endpoint específico para aquele branch e que estará imediatamente disponível para testar as alterações feitas.

Assim que novos branches como novas features forem criados, a integração contínua através de ferramenta [BuildKite](https://buildkite.com/) é iniciada e um novo ambiente é provisionado em alguns segundos.

Os detalhes completos do fluxo de desenvolvimento do time do [hey.com](http://hey.com) podem ser encontrados [neste artigo do Blake Stoddard](https://m.signalvnoise.com/seamless-branch-deploys-with-kubernetes/), Senior System Administrator no Basecamp.

## Bonus insight: o domínio hey.com

[Neste artigo](https://m.signalvnoise.com/how-we-acquired-hey-com/), o CEO Jason Fried explica como conseguiu comprar o domínio hey.com. Apesar de não informar o valor final da transação, ele mostra como, depois de 18 meses e mais de 60 e-mails trocados, se deu a negociação. E também, como é complicado conseguir um bom domínio hoje em dia.

Você arriscaria um palpite sobre qual foi o lance final?

##

Espero que este artigo tenha lhe trazido alguma inspiração sobre como criar um produto moderno e escalável como o hey.com!

Um abraço, e até a próxima!
