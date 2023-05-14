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
        Tenho uma paixão especial por compartilhar conteúdo, conhecer novas pessoas e contribuir para as comunidades das
        quais participo. Portanto, tenho grande prazer em palestrar em conferências, meetups, eventos internos, ou
        qualquer outra oportunidade. Se você se interessar por alguma de minhas palestras, por favor, não hesite em
        entrar em contato. 👋🏻
      </p>
      <p>
        <h3>Palestras disponíveis atualmente</h3>
      </p>
      <p>
        <ul>
          <li>
            <b>Avoiding burnout as a software engineer 🇺🇸</b>
            <Description>
              <div>
                Um estudo recente da Gallup descobriu que cerca de 2/3 dos trabalhadores em tempo integral experimentam
                burnout no trabalho. Nessa palestra eu esclareço o que é burnout e os mitos em torno dele, e tento dar
                pontos de ação claros sobre como evitá-lo como um engenheiro de software e como um gerente.
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
                Nesta palestra tento mostrar, com um exemplo muito simples, o contexto da criação do conceito de módulos
                em JavaScript. Também fiz uma sessão de codificação ao vivo, mostrando como criar e publicar componentes
                reutilizáveis. Vídeo completo no final do post.
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
        <h3>Palestras passadas</h3>
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
