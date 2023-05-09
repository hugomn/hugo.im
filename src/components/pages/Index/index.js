import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../layout';
import PostCardList from '../../PostCardList';
import { FormattedMessage } from 'react-intl';
import BtnLink from '../../BtnLink';
import styled from 'styled-components';
import { media } from '../../../constants/responsive';
import NewsletterForm from './NewsletterForm';

const Index = (props) => {
  const allStoriesPosts = props.data.all.edges.map((p) => p.node);
  const featuredPosts = props.data.featured.edges.map((p) => p.node);
  const { author } = props.data.site.siteMetadata;
  const { langKey } = props.pageContext;

  return (
    <Layout location={props.location}>
      <Wrapper>
        <FeaturedContainer>
          <H2>
            <FormattedMessage id="index.featured">{(txt) => <span>{txt}</span>}</FormattedMessage>
          </H2>
          <PostCardList posts={featuredPosts} author={author} />
        </FeaturedContainer>
        <AllStoriesContainer>
          <H2>
            <FormattedMessage id="index.stories">{(txt) => <span>{txt}</span>}</FormattedMessage>
          </H2>
          <PostCardList posts={allStoriesPosts} author={author} imageOnTop />
          <FormattedMessage id="posts.seeMore">
            {(txt) => <BtnLink to={`/${langKey !== 'en' ? `${langKey}/` : ''}blog`}>{txt}</BtnLink>}
          </FormattedMessage>
        </AllStoriesContainer>
        {/* <NewsletterForm /> */}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  ${media.md`
        padding: 0 45px;
    `}
`;

const FeaturedContainer = styled.section`
  margin: ${(props) => props.theme.blog.list.margin};
`;

const AllStoriesContainer = styled.section`
  margin: ${(props) => props.theme.blog.list.margin};
`;

const H2 = styled.h2`
  font-size: 1.4rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 27px;
  padding-top: 25px;
  span {
    border-bottom: 1px solid rgba(0, 0, 0, 0.44);
    display: inline-block;
    padding-bottom: 20px;
    margin-bottom: -1px;
  }
`;

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Index;
