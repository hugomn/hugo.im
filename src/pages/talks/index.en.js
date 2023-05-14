import React from 'react';
import styled from 'styled-components';
import Page from '../../components/pages/Page';

const Description = styled.div`
  margin: 0.4rem 0 4rem 0;
  font-size: ${({ theme }) => theme.scale(0.3)};
`;

const PastTalksList = styled.ul`
  font-size: ${({ theme }) => theme.scale(0.5)};
`;

const i18n = {
  titleId: 'talks',
  content: (
    <>
      <p>
        I have a special passion for sharing content, meeting new people, and contributing to the communities I am a
        part of. So I take great pleasure in speaking at conferences, meet-ups, internal events, or any other
        opportunity. If you would like me to speak at your event, please don't hesitate to get in touch. 👋🏻
      </p>
      <p>
        <h3>Current available talks</h3>
      </p>
      <p>
        <ul>
          <li>
            <b>Avoiding burnout as a software engineer 🇺🇸</b>
            <Description>
              <div>
                A recent Gallup study found that about 2/3 of full-time workers experience burnout on the job. In this
                talk I clarify what is burnout and the myths around it, and try to give clear action points on how to
                avoid it as a software engineer and as a manager.
              </div>
              <div>
                <b>Links</b>: <a href="https://www.hugo.im/blog/avoiding-burnout-as-a-software-engineer">Post</a> |{' '}
                <a href="https://docs.google.com/presentation/d/1263EGGzzQI4VQbbpo84kctB7FAhaeQhHDiz9AfHoBxE/edit?usp=sharing">
                  Slides
                </a>
              </div>
            </Description>
          </li>
          <li>
            <b>How to develop reusable components with Babel and RollupJS 🇺🇸</b>
            <Description>
              <div>
                In this talk I try to show, with a very simple example, the context of creating the concept of modules
                in JavaScript. I also did a live-coding session, showing how to create and publish reusable components.
                Full video at the end of the post.
              </div>
              <div>
                <b>Links</b>:{' '}
                <a href="https://www.hugo.im/blog/how-to-develop-reusable-components-with-babel-and-rollupjs">Post</a> |{' '}
                <a href="https://speakerdeck.com/hugomn/how-to-develop-reusable-components-with-babel-and-rollup-dot-js">
                  Slides
                </a>{' '}
                | <a href="https://www.youtube.com/watch?v=Dve_bYaAVZ0">Recording</a>
              </div>
            </Description>
          </li>
        </ul>
      </p>
      <p>
        <h3>Past talks</h3>
      </p>
      <p>
        <PastTalksList>
          <li>
            <a href="https://www.slideshare.net/hugomn/inbound-marketing-a-nova-forma-de-se-comunicar-e-conquistar-seus-clientes">
              Inbound marketing - the new way of communicating with your customers 🇧🇷 (2016)
            </a>
          </li>
          <li>
            <a href="https://www.slideshare.net/hugomn/conhecendo-os-fundamentos-e-desenvolvendo-uma-apliao-bsica-com-angular2">
              Knowing the foundations and developing a basic Angular 2 app 🇧🇷 (2016)
            </a>
          </li>
          <li>
            <a href="https://www.slideshare.net/hugomn/empreendedorismo-e-as-oportunidades-disfaradas">
              Entrepreneurship and Hidden Opportunities 🇧🇷 (2012)
            </a>
          </li>
          <li>
            <a href="https://www.slideshare.net/hugomn/introduo-ao-symfony-2">Introduction to Symfony 2 🇧🇷 (2012)</a>
          </li>
          <li>
            <a href="https://www.slideshare.net/hugomn/symfony-framework-php-de-alta-produtividade">
              PHP application development using a high-productivity framework 🇧🇷 (2011)
            </a>
          </li>
          <li>
            <a href="https://www.slideshare.net/hugomn/mdias-sociais-para-negcios">
              Social Media for business 🇧🇷 (2011)
            </a>
          </li>
          <li>
            <a href="https://www.slideshare.net/hugomn/seo-como-e-porque-otimizar-um-website-semana-da-informtica-ufv">
              SEO - How and why optimize a website 🇧🇷 (2010)
            </a>
          </li>
        </PastTalksList>
      </p>
    </>
  ),
  description: `
  I have a special passion for sharing content, and here's the list of all talks I have given in the past. I'm always open to speaking in events, meet-ups or in your company.
  `,
};

const DefaultPage = (props) => <Page i18n={i18n} {...props} />;
export default DefaultPage;
