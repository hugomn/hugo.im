import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import Gravatar from 'react-gravatar';
import Time from '../components/Time';

const Wrapper = styled(Grid)`
  font-family: ${props => props.theme.blog.author.fontFamily};
  font-size: ${props => props.theme.blog.author.fontSize};
  line-height: ${props => props.theme.blog.author.lineHeight};
`;

const Date = styled(Time)`
  color: ${props => props.theme.blog.author.time.color};
  display: block;
`;

const ProfilePicture = styled(Gravatar)`
  display: block;
  border-radius: 50%;
`;

const FollowButton = styled.a`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  height: 21px;
  padding: 0 10px;
  color: rgba(0,0,0,.84);
  border: 1px solid rgba(0,0,0,.68);
  border-radius: 4px;
  user-select: none!important;
  margin-left: 14px;
  span {
    font-size: 13px;
    line-height: 19px;
    padding-bottom: 2px;
  }
`;

const PostAuthor = ({ author, className, date, showFollow }) => {
  return (
    <Wrapper columns={'50px 1fr'} className={className}>
      <Cell middle>
        <ProfilePicture email={author.email} alt={author.name} width={42} height={42} />
      </Cell>
      <Cell middle>
        <span>
          {author.name}
          { showFollow 
            ? <FollowButton href={`http://twitter.com/${author.twitter}`} target="_blank">
              <span>Follow</span>
            </FollowButton> 
            : null }
        </span>
        <Date
          pubdate="pubdate"
          date={date}
        />
      </Cell>
    </Wrapper>
  );
};

PostAuthor.propTypes = {
  author: PropTypes.object.isRequired,
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  showFollow: PropTypes.boolean
};

export default PostAuthor;