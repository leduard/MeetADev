import React, { useRef, useState, useCallback } from 'react';

import { Container, App, Content, PostForm, Image } from './styles';

import Header from '../../components/Header';
import PostsList from '../../components/PostsList';
import Spinner from '../../components/Spinner';

import api from '../../services/api';
import { useAuth } from '../../context/Auth';

const Home: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [posting, setPosting] = useState(false);
  const [reloadPosts, setReloadPosts] = useState(0);
  const ContentRef = useRef<HTMLDivElement>(null);

  const {
    user: { token },
  } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!postContent) return;
      setPosting(true);

      await api.post(
        '/posts',
        { content: postContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPostContent('');
      setReloadPosts((prev) => prev + 1);
      setPosting(false);
    },
    [postContent, token],
  );

  return (
    <Container>
      <Image />
      <App>
        <Header />
        <Content ref={ContentRef}>
          <PostForm onSubmit={handleSubmit}>
            <textarea
              placeholder="o que você descobriu hoje?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <button type="submit">{!posting ? 'postar' : <Spinner />}</button>
          </PostForm>
          <PostsList contentRef={ContentRef} reload={reloadPosts} />
        </Content>
      </App>
      <Image />
    </Container>
  );
};

export default Home;
