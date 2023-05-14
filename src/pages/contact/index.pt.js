import React from 'react';
import Page from '../../components/pages/Page';

const i18n = {
  titleId: 'contact',
  content: (
    <>
      <p>
        I&rsquo;d love to <strong>chat</strong> and <strong>meet new people</strong>. I&rsquo;m looking for{' '}
        <strong>problems worth solving</strong>, a place that will <strong>challenge me</strong>, and{' '}
        <strong>opportunities</strong> that I can help others and myself <strong>grow</strong>.&nbsp;
      </p>
      <p>Let&rsquo;s do something awesome.</p>
      <p>
        Email:&nbsp;<a href="mailto:hello@hugomagalhaes.com">hello@hugomagalhaes.com</a>
        <br />
        Linkedin:&nbsp;
        <a href="http://linkedin.hugomagalhaes.com" target="_blank">
          http://linkedin.hugomagalhaes.com
        </a>
        <br />
        GitHub:&nbsp;
        <a href="http://github.hugomagalhaes.com" target="_blank">
          http://github.hugomagalhaes.com
        </a>
      </p>
    </>
  ),
  description: `
    I’d love to chat and meet new people. I’m looking for problems worth solving, a place that will challenge me, and opportunities that I can help others and myself grow. 
  `,
};

const DefaultPage = (props) => <Page i18n={i18n} {...props} />;
export default DefaultPage;
