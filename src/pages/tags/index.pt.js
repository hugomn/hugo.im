import React from 'react';
import TagsPageRoute from '../../components/pages/Tags';
import { graphql } from 'gatsby';

const DefaultPage = (props) => <TagsPageRoute {...props} />;
export default DefaultPage;

export const pageQuery = graphql`
  query TagsPtQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { draft: { ne: true } }, fields: { langKey: { eq: "pt" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
