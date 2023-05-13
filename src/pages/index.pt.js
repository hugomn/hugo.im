import React from 'react';
import IndexComponent from '../components/pages/Index';
import { graphql } from 'gatsby';

const Index = (props) => <IndexComponent {...props} />;
export default Index;

export const pageQuery = graphql`
  query IndexPtQuery {
    site {
      siteMetadata {
        author {
          name
          homeCity
          email
          bio
          defaultLink
        }
      }
    }
    all: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { draft: { ne: true }, featured: { ne: true } }
        fields: { langKey: { regex: "/(pt|any)/" } }
      }
    ) {
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
          timeToRead
        }
      }
    }
    featured: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { draft: { ne: true }, featured: { eq: true } }
        fields: { langKey: { regex: "/(pt|any)/" } }
      }
    ) {
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
          timeToRead
        }
      }
    }
  }
`;
