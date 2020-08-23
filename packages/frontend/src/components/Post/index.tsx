import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import {
  Container,
  ProfileImage,
  Header,
  ContentWrapper,
  Content,
} from './styles';

const Post: React.FC = () => {
  const history = useHistory();

  return (
    <Container
      onClick={(e): void => {
        e.stopPropagation();
        history.push('/leduardo/s/post-uuid');
      }}
    >
      <ProfileImage
        onClick={(e): void => {
          e.stopPropagation();
          history.push('/leduardo');
        }}
      >
        L
      </ProfileImage>
      <ContentWrapper>
        <Header>
          <h5 style={{ fontSize: 14 }}>@leduardo</h5>
          <h5 style={{ fontSize: 12 }}>50min atrás</h5>
        </Header>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Content>
        <FiHeart
          onClick={(e): void => {
            e.stopPropagation();
            console.log('like');
          }}
          size={25}
          strokeWidth={1}
        />
      </ContentWrapper>
    </Container>
  );
};

export default Post;
