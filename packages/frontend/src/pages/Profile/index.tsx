import React, { useState, useEffect, useRef } from 'react';
import { FiUserPlus } from 'react-icons/fi';
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

  const username = useLocation().pathname.replace('/', '');
  const {
    user: {
      user: { username: signedUser },
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
                      <FiUserPlus size={24} />
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
