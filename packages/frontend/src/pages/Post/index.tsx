import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  App,
  Container,
  PostContainer,
  PostProfileImage,
  PostHeader,
  PostContentWrapper,
  PostContent,
  Image,
} from './styles';

import Header from '../../components/Header';
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

const Post: React.FC = () => {
  const [username, postID] = useLocation()
    .pathname.split('/')
    .filter((value) => !!value && value !== 's');
  const [postExists, setPostExists] = useState(true);
  const [post, setPost] = useState({} as PostInterface);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const {
    user: { token },
  } = useAuth();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await api.get(`/posts/${username}/${postID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!data) setPostExists(false);

        setPost(data);
        setLoading(false);
      } catch (err) {
        setPostExists(false);
        setLoading(false);
      }
    };

    getPost();
  }, [postID, token, username]);

  return (
    <Container>
      <Image />
      <App>
        <Header showAppIcon />
        {loading ? (
          <div style={{ marginTop: '75%' }}>
            <Spinner size={65} color="#edebeb" />
          </div>
        ) : (
          <>
            {!postExists ? (
              <div style={{ marginTop: '120px' }}>
                <h1>post not found</h1>
              </div>
            ) : (
              <PostContainer>
                <PostProfileImage
                  onClick={(e): void => {
                    e.stopPropagation();
                    history.push(`/${username}`);
                  }}
                >
                  {username.charAt(0)}
                </PostProfileImage>
                <PostContentWrapper>
                  <PostHeader>
                    <h5>{`${post.user.name}`}</h5>
                    <h5 style={{ fontSize: 12 }}>
                      {`${formatDistanceToNow(new Date(post.created_at), {
                        locale: ptBR,
                        includeSeconds: true,
                      })} atrás`}
                    </h5>
                  </PostHeader>
                  <h5 style={{ fontSize: 14 }}>{`@${username}`}</h5>
                  <PostContent>{post.content}</PostContent>
                </PostContentWrapper>
              </PostContainer>
            )}
          </>
        )}
      </App>
      <Image />
    </Container>
  );
};

export default Post;
