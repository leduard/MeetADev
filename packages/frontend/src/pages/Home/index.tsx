import React from 'react';

import {
  Container,
  App,
  Content,
  PostForm,
  PostsContainer,
  Image,
} from './styles';

import Header from '../../components/Header';
import Post from '../../components/Post';

const Home: React.FC = () => {
  return (
    <Container>
      <Image />
      <App>
        <Header />
        <Content>
          <PostForm>
            <textarea placeholder="o que você descobriu hoje?" />
            <button type="button">postar</button>
          </PostForm>

          <PostsContainer>
            {['', '', ''].map((post) => (
              <Post key={Math.random()} />
            ))}
          </PostsContainer>
        </Content>
      </App>
      <Image />
    </Container>
  );
};

export default Home;
