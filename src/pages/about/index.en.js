import React from 'react';
import Page from '../../components/pages/Page';

const i18n = {
  titleId: 'about',
  content: (
    <>
      <p>
        Hello, it&rsquo;s <strong>Hugo</strong> here.
      </p>
      <p>
        I am a technology strategist, product development specialist, and team manager with about 20 years of experience
        in software and consulting.
      </p>
      <p>
        I work as Venture CTO and Engineering Lead at BCG Digital Ventures, where we invent, build and invest in
        startups with the world's most influential companies.
      </p>
      <p>
        I've been working recently on the Health Tech sector, mainly on software as Medical Device and apps on
        prescription for the german market (DiGA).
      </p>
      <p>
        Specialties: CTO, Head of Engineering and VP Engineering; Technology Strategy, Product Development, Solution
        Architecture; Entrepreneurial, Start-up Focus; Successful Product Management and New Product Development;
        Mission Critical Systems; Banking and Finance, Payments, Mobile and Online Banking; Software as Medical Device,
        Apps on Prescription (DiGA), Health Techs.
      </p>
      <p>
        If you want to know more, <a href="/contact">please contact me</a>. I&rsquo;d love to chat or have a{' '}
        <strong>beer</strong>.
      </p>
      <p>Cheers!</p>
    </>
  ),
  description: `
    I am a technology strategist, product development specialist, and team manager with about 20 years of experience in software and consulting.
  `,
};

const DefaultPage = (props) => <Page i18n={i18n} {...props} />;
export default DefaultPage;
