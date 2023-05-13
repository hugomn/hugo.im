import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PostCardList from '../components/PostCardList';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import BtnLink from '../components/BtnLink';

const Wrapper = styled.section`
  margin: ${(props) => props.theme.page.margin};
  padding: ${(props) => props.theme.page.padding};
`;

const Header = styled.header`
  font-family: ${(props) => props.theme.page.header.fontFamily};
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  margin: ${(props) => props.theme.page.header.margin};
`;

const H1 = styled.h1`
  font-size: 1.8rem;
  padding: 0;
  span {
    border-bottom: 1px solid rgba(0, 0, 0, 0.44);
    display: inline-block;
    padding-bottom: ${({ theme }) => theme.scale(3.5)};
    margin-bottom: -1px;
  }
`;

const TagRoute = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges.map((p) => p.node);
  const { author } = data.site.siteMetadata;

  const allTagsLink = (
    <FormattedMessage id="tags.allTagsLink">{(txt) => <BtnLink to="/tags/">{txt}</BtnLink>}</FormattedMessage>
  );

  return (
    <Layout location={location}>
      <Wrapper>
        <FormattedMessage id="tags">
          {(txt) => (
            <Header>
              <Helmet title={`${pageContext.tag} | ${txt}`} meta={[{ name: 'description', content: txt }]} />
              <H1>
                <span>
                  <FormattedMessage id="tags.nPostsTaggedWith" values={{ nPosts: data.allMarkdownRemark.totalCount }}>
                    {(txt) => `${txt} "${pageContext.tag}"`}
                  </FormattedMessage>
                </span>
              </H1>
            </Header>
          )}
        </FormattedMessage>
        <PostCardList posts={posts} author={author} />
        <footer>{allTagsLink}</footer>
      </Wrapper>
    </Layout>
  );
};

TagRoute.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
};

export default TagRoute;

export const pageQuery = graphql`
  query TagPage($tag: String, $langKey: String) {
    site {
      siteMetadata {
        author {
          name
          homeCity
          email
          defaultLink
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } }, fields: { langKey: { eq: $langKey } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            image {
              childImageSharp {
                fluid(maxWidth: 750) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
            langKey
          }
          excerpt
        }
      }
    }
  }
`;
