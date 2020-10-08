import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiUserPlus, FiUserMinus } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import {
  Container,
  App,
  Content,
  ProfileCard,
  ProfileImage,
  ProfileContent,
  Image,
} from './styles';

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PostsList from '../../components/PostsList';

import api from '../../services/api';
import { useAuth } from '../../context/Auth';

interface User {
  id: string;
  name: string;
  username: string;
  created_at: Date;
  followers_count: number;
  following_count: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({} as User);
  const [userFound, setUserFound] = useState(true);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(true);

  const username = useLocation().pathname.replace('/', '');
  const {
    user: {
      user: { username: signedUser },
      token,
    },
  } = useAuth();

  const ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await api.get(`/users/${username}`);

      if (!data.id) setUserFound(false);

      setUser(data);
      setLoading(false);
    };

    getUser();
  }, []); // eslint-disable-line

  const handleFollow = useCallback(async () => {
    try {
      const { data, status } = await api.post(`/follows/${username}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200 && data.id) setFollowing(true);
    } catch (err) {
      console.log(err);
    }
  }, [token, username]);

  const handleUnfollow = useCallback(async () => {
    try {
      const { status } = await api.delete(`/follows/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) setFollowing(false);
    } catch (err) {
      console.log(err);
    }
  }, [token, username]);

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
          <Content ref={ContentRef}>
            {!userFound ? (
              <h1>user not found</h1>
            ) : (
              <>
                <ProfileCard>
                  <ProfileImage>{user.name.charAt(0)}</ProfileImage>
                  <ProfileContent>
                    <div>
                      <h3>{user.name}</h3>
                      <h5>{`@${username}`}</h5>
                    </div>
                    <span>
                      <h5>{`${user.followers_count} seguidores`}</h5>
                      <h5>{`seguindo ${user.following_count}`}</h5>
                    </span>
                  </ProfileContent>
                  {signedUser !== username && (
                    <span>
                      {!following ? (
                        <FiUserPlus size={24} onClick={handleFollow} />
                      ) : (
                        <FiUserMinus size={24} onClick={handleUnfollow} />
                      )}
                    </span>
                  )}
                </ProfileCard>
                <PostsList contentRef={ContentRef} username={username} />
              </>
            )}
          </Content>
        )}
      </App>
      <Image />
    </Container>
  );
};

export default Profile;
