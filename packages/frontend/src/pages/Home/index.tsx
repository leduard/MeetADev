import React, { useState, useEffect, useCallback, useRef } from 'react';

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
import Spinner from '../../components/Spinner';

import api from '../../services/api';
import { useAuth } from '../../context/Auth';

interface PostInterface {
  id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
    username: string;
    followers_count: number;
    following_count: number;
  };
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  const ContentRef = useRef<HTMLDivElement>(null);

  const {
    user: { token: authToken },
  } = useAuth();

  const getPosts = useCallback(
    async (page = 1, isFetch = false) => {
      if (fetching) return;

      setLoading(!isFetch);

      const { status, data } = await api.get(`/posts?page=${page}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (status === 200) {
        setCurrentPage(page + 1);
        if (!itemsPerPage) setItemsPerPage(data.itemsPerPage);
        setPostsCount(data.postsCount);
        setPosts((prev) => (isFetch ? [...prev, ...data.posts] : data.posts));
      }

      setLoading(false);
      setFetching(false);
    },
    [authToken, currentPage, fetching], // eslint-disable-line
  );

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!fetching)
      window.onscroll = async () => {
        if (ContentRef.current) {
          const { scrollY, innerHeight } = window;
          const { scrollHeight } = ContentRef.current;

          if (scrollY === scrollHeight - innerHeight + 80 && !fetching) {
            if (
              !!posts.length &&
              !(Math.ceil(postsCount / itemsPerPage) >= currentPage)
            )
              return;
            setFetching(true);
            await getPosts(currentPage, true);
          }
        }
      };
    else window.onscroll = null;
  }, [getPosts, currentPage, fetching, posts.length, postsCount, itemsPerPage]);

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

          {loading ? (
            <div style={{ marginTop: '45%' }}>
              <Spinner color="#edebeb" size={85} width={4} />
            </div>
          ) : (
            <>
              <PostsContainer>
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </PostsContainer>
              {fetching && (
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                  <Spinner color="#edebeb" size={45} />
                </div>
              )}
            </>
          )}
        </Content>
      </App>
      <Image />
    </Container>
  );
};

export default Home;
