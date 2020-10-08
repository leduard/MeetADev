import React, { useState, useCallback, useEffect } from 'react';

import { Container } from './styles';

import Post from '../Post';
import Spinner from '../Spinner';

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

interface PostsListComponent {
  contentRef: React.RefObject<HTMLDivElement>;
  username?: string;
  reload?: number;
}

const PostsList: React.FC<PostsListComponent> = ({
  contentRef,
  username,
  reload,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  const {
    user: { token: authToken },
  } = useAuth();

  const getPosts = useCallback(
    async (page = 1, isFetch = false) => {
      if (fetching) return;

      setLoading(!isFetch);

      const { status, data } = await api.get(
        `/posts${username ? `/${username}?page=${page}` : `?page=${page}`}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

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
    getPosts();
  }, [reload]); // eslint-disable-line

  useEffect(() => {
    if (!fetching)
      window.onscroll = async () => {
        if (contentRef.current) {
          const { scrollY, innerHeight } = window;
          const { scrollHeight } = contentRef.current;

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
  }, [
    getPosts,
    currentPage,
    fetching,
    posts.length,
    postsCount,
    itemsPerPage,
    contentRef,
  ]);

  return loading ? (
    <div style={{ marginTop: '45%' }}>
      <Spinner color="#edebeb" size={85} width={4} />
    </div>
  ) : (
    <>
      <Container>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Container>
      {fetching && (
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Spinner color="#edebeb" size={45} />
        </div>
      )}
    </>
  );
};

export default PostsList;
