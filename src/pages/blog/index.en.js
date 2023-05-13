import React from 'react';
import Blog from '../../components/pages/Blog';
import { graphql } from 'gatsby';

const BlogIndex = (props) => <Blog {...props} />;
export default BlogIndex;

export const pageQuery = graphql`
  query BlogEnQuery {
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
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } }, fields: { langKey: { regex: "/(en|any)/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
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
            tagSlugs {
              tag
              link
            }
          }
          excerpt
        }
      }
    }
  }
`;
