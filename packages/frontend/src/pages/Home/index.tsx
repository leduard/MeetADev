import React, { useRef } from 'react';

import { Container, App, Content, PostForm, Image } from './styles';

import Header from '../../components/Header';
import PostsList from '../../components/PostsList';

const Home: React.FC = () => {
  const ContentRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Image />
      <App>
        <Header />
        <Content ref={ContentRef}>
          <PostForm>
            <textarea placeholder="o que você descobriu hoje?" />
            <button type="button">postar</button>
          </PostForm>
          <PostsList contentRef={ContentRef} />
        </Content>
      </App>
      <Image />
    </Container>
  );
};

export default Home;
