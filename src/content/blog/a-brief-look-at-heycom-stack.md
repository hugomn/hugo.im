---
author: Hugo Nogueira
pubDatetime: 2020-06-30T00:00:00.000Z
title: "A brief look at hey.com stack"
locale: en
postSlug: a-brief-look-at-heycom-stack
featured: false
draft: false
ogImage: /images/20200630.jpg
tags:
  - technology
  - ruby-on-rails
  - inspiration
  - stack
description: An exploration of the technology stack and infrastructure behind Basecamp's Hey email service, including Ruby on Rails, Kubernetes, and their development workflow.
---

Two weeks ago, Basecamp launched its own e-mail service that aims to challenge the main online e-mail platforms, called Hey (and which resides in the attractive e-mail [hey.com](hey.com)). The launch was announced on June 15, in a tweet by the company's CEO and co-founder, Jason Fried:

<br/>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Two years of work comes alive today. Couldn't be more proud of our team. It wasn't easy, but it was incredibly fun. And today we get to show the world what we've been working on. Email's new heyday is here. HEY: <a href="https://t.co/Qyp1WsIIly">https://t.co/Qyp1WsIIly</a></p>&mdash; Jason Fried (@jasonfried) <a href="https://twitter.com/jasonfried/status/1272533092939505664?ref_src=twsrc%5Etfw">June 15, 2020</a></blockquote>

The platform, which was initially made available through invitations, generated excitement in technology enthusiasts, for bringing a different approach to the so common e-mail service: right after logging in, we came across the "Imbox" (with M, of IMportant ), an inbox that only shows pre-authorized e-mails, a separate place for newsletters and even a "paper-trail" where receipts and order confirmations will be stored.

An interesting point to be noted by technologists: [hey.com](http://hey.com) is far from being an MVP as we have seen in other startups. The tool was developed for two years until its launch, and its initial version already offers advanced tools such as the ability to merge email threads, notifications for specific contacts, etc. In addition, the service is not free: it offers a 14-day trial version, after which an yearly fee of $99 is charged.

However, the point that intriguing me most during the week was trying to understand the stack and infrastructure behind hey.com. Because it was launched by Basecamp, known for its software quality and agile development practices, there was certainly something interesting there.

In a response inside Jason Fried's thread, CTO David Hainemeier made a joke about hype technologies, making it obvious that [hey.com](http://hey.com) uses a simple stack, and obviously with Ruby on Rails (which was created by David in 2004):

<br/>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Went with a serverless, microservices architecture on the backend based on Go, Rust, and Flubber, paired with a nanoservices frontend, mixing react, redux, vuejs, and actually angular together for a best in breed combination ✌️</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/status/1225506212265037827?ref_src=twsrc%5Etfw">February 6, 2020</a></blockquote>

Unfortunately, [hey.com](http://hey.com) is not open source, so I had to do a little research to get a better idea of the technologies used.

> Important disclosure: as the [hey.com](http://hey.com) code is not open source, and no official announcements have been made, the statements I make here are all based on information from social networks and superficial analysis I made looking at the platform's html.

## Web application

As we could imagine, [hey.com](http://hey.com) is a Ruby on Rails web application rendered on the server, without using any front-end frameworks on the client side (like React, Vue). When inspecting the code, we can easily note the use of [turbolinks](https://github.com/turbolinks/turbolinks), a library for displaying page blocks without the need to reload all the HTML, and which provides a very quick and smooth navigation:

![Turbolinks in hey.com code](/images/20200630_web.png 'Turbolinks')

I'm not going to dive into the [hey.com](http://hey.com) Ruby on Rails application here very much, but if you're interested, Matouš Borák wrote a very in-depth article [here](https://dev.to/borama/a-few-sneak-peeks-into-hey-com-technology-i-intro-4bjg).

## Infrastructure

Regarding the application's infrastructure, David Hainemeier explained that they chose Kubernetes to orchestrate the application's containers. Asked about the real need for the tool, DHH argued that for tools like Hey, where it is not known whether 10 or 1 million users will register on the platform, an orchestrator like Kubernetes is extremely necessary:

<br/>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Because the cloud is actually a great place to run a product where you have no idea whether 10 people and a dustbowl shows up or if half a million people suddenly wants in. Uncertain scale = great fit. (And K8S is a great way to run cloud).</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/status/1226252386252947456?ref_src=twsrc%5Etfw">February 8, 2020</a></blockquote>

Still on infrastructure, Blake Stoddard, Senior System Administrator at Basecamp, wrote [in this article](https://m.signalvnoise.com/seamless-branch-deploys-with-kubernetes/) of April 20, 2020, that to manage its clusters, the team uses Amazon EKS to automate Kubernetes execution.

## Development workflow

Inspired by GitHub's [branch-lab system](https://github.blog/2015-06-02-deploying-branches-to-github-com/), the [hey.com](http://hey.com) development team uses a system that immediately deploys any branch at a specific endpoint for that branch and that will be immediately available to test the changes made.

As soon as new branches as new features are created, continuous integration through the [BuildKite](https://buildkite.com/) tool is started and a new environment is provisioned in a few seconds.

Full details of the [hey.com](http://hey.com) team's development flow can be found [in this Blake Stoddard article](https://m.signalvnoise.com/seamless-branch-deploys-with-kubernetes/), Senior System Administrator at Basecamp.

## Bonus insight: the hey.com domain

[In this article](https://m.signalvnoise.com/how-we-acquired-hey-com/), CEO Jason Fried explains how he managed to buy the hey.com domain. Despite not exposing the final offer, it shows how, after 18 months and more than 60 emails exchanged, the negotiation took place. Also, how difficult it is to get a good domain today.

Would you risk making a guess about the final offer?

##

I hope this article has given you some inspiration on how to create a modern and scalable product like hey.com!