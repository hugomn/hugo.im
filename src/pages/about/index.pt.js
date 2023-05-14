import React from 'react';
import Page from '../../components/pages/Page';

const i18n = {
  titleId: 'about',
  content: (
    <>
      <p>Olá, Hugo aqui!</p>
      <p>
        Sou estrategista de tecnologia, especialista em desenvolvimento de produtos e gerente de equipe com cerca de 20
        anos de experiência em software e consultoria.
      </p>
      <p>
        Trabalho como Venture CTO e Engineering Lead na BCG Digital Ventures, onde inventamos, construímos e investimos
        em startups com as empresas mais influentes do mundo.
      </p>
      <p>
        Tenho trabalhado recentemente no setor de Health Tech, principalmente em software como Dispositivo Médico e
        aplicativos sob prescrição para o mercado alemão (DiGA).
      </p>
      <p>
        Especialidades: CTO, Chefe de Engenharia e VP de Engenharia; Estratégia Tecnológica, Desenvolvimento de
        Produtos, Arquitetura de Soluções; Empreendedorismo, Foco no Start-up; Gerenciamento de Produtos de Sucesso e
        Desenvolvimento de Novos Produtos; Sistemas de Missão Crítica; Bancos e Finanças, Pagamentos, Mobile e Online
        Banking; Software como Dispositivo Médico, Apps on Prescription (DiGA), Health Techs. Traduzido com a versão
        gratuita do tradutor - www.DeepL.com/Translator
      </p>
      <p>
        Se quiser saber mais, <a href="/contact">entre em contato!</a>. Eu adoraria bater um papo, tomar um café ou uma
        cerveja.
      </p>
      <p>Cheers!</p>
    </>
  ),
  description: `
    Estrategista de tecnologia, especialista em desenvolvimento de produtos e gerente de equipe com cerca de 20
  anos de experiência em software e consultoria.
  `,
};

const DefaultPage = (props) => <Page i18n={i18n} {...props} />;
export default DefaultPage;
