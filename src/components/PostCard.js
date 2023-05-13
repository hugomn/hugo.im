import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import Img from 'gatsby-image';
import Author from './PostAuthor';
import { media, visible } from '../constants/responsive';

const PostCard = ({ post, author, imageOnTop }) => {
  return (
    <Wrapper imageOnTop={imageOnTop}>
      <Cell>
        <Link to={post.fields.slug}>
          <Image fluid={post.frontmatter.image.childImageSharp.fluid} />
        </Link>
      </Cell>
      <Cell>
        <GridContainer columns={1} rows="1fr auto">
          <Body>
            <Title>
              <TitleLink to={post.fields.slug}>{post.frontmatter.title}</TitleLink>
            </Title>
            <Text>{post.excerpt}</Text>
          </Body>
          <Footer>
            <Author author={author} date={post.frontmatter.date} />
            <Label>
              <Link to={post.fields.slug}>
                <svg width="25" height="25">
                  <path
                    d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                    fillRule="evenodd"
                  />
                </svg>
              </Link>
            </Label>
          </Footer>
        </GridContainer>
      </Cell>
    </Wrapper>
  );
};

const GridContainer = styled(Grid)`
  height: 100%;
`;

const Wrapper = styled(GridContainer)`
  border: ${(props) => props.theme.blog.list.item.border};
  border-radius: 0.25rem;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: 3fr 5fr;
  ${media.md`
    ${(props) =>
      props.imageOnTop
        ? ` grid-template-rows: repeat(2,1fr);
        grid-template-columns: 1fr;`
        : ''};
  `}
`;

const Body = styled(Cell)`
  padding: ${(props) => props.theme.blog.list.item.padding};
`;

const Footer = styled(Cell)`
  font-family: ${(props) => props.theme.blog.author.fontFamily};
  font-size: ${(props) => props.theme.blog.author.fontSize};
  padding: ${({ theme }) => `${theme.scale(-1.5)} ${theme.scale(1.2)} ${theme.scale(0)}`};
  line-height: ${(props) => props.theme.blog.author.lineHeight};
  height: auto;
  position: relative;
`;

const Title = styled.h2`
  padding: 0;
  font-family: ${(props) => props.theme.blog.list.item.title.fontFamily};
  font-size: ${(props) => props.theme.blog.list.item.title.fontSize};
  font-weight: 500;
  line-height: ${(props) => props.theme.blog.list.item.title.lineHeight};
  margin: ${(props) => props.theme.blog.list.item.title.margin};
`;

const TitleLink = styled(Link)`
  color: ${(props) => props.theme.blog.list.item.title.color};
  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.blog.list.item.title.hover.color};
  }
`;

const Text = styled.p`
  font-family: ${(props) => props.theme.blog.list.item.text.fontFamily};
  font-size: ${(props) => props.theme.blog.list.item.text.fontSize};
  font-weight: 200;
  color: ${(props) => props.theme.blog.list.item.text.color};
  margin: ${(props) => props.theme.blog.list.item.text.margin};
  padding: ${(props) => props.theme.blog.list.item.text.padding};
  line-height: ${(props) => props.theme.blog.list.item.text.lineHeight};
`;

const Label = styled.div`
  ${visible.md}
  position: absolute;
  right: 18px;
  bottom: 18px;
`;

const Image = styled(Img)`
  height: 100%;
`;

PostCard.propTypes = {
  post: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      langKey: PropTypes.string.isRequired,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
    excerpt: PropTypes.string.isRequired,
  }),
  author: PropTypes.object.isRequired,
  imageOnTop: PropTypes.bool,
};

export default PostCard;
