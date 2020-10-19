import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiEdit, FiMail, FiTrash2 } from 'react-icons/fi';

import {
  Container,
  App,
  Content,
  ProfileCard,
  ProfileImage,
  SettingsContainer,
  Image,
} from './styles';

import Header from '../../components/Header';

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

const Settings: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const nameRef = useRef<HTMLDivElement>(null);

  const {
    user: { user, token },
  } = useAuth();

  const handleNameEdit = useCallback(async () => {}, []);

  return (
    <Container>
      <Image />
      <App>
        <Header showAppIcon />
        <Content>
          <ProfileCard>
            <ProfileImage>{user.name.charAt(0)}</ProfileImage>
            <div>
              <div>
                <h3 ref={nameRef}>{user.name}</h3>
                <FiEdit size={20} />
              </div>
              <h5>{`@${user.username}`}</h5>
            </div>
          </ProfileCard>
          <SettingsContainer>
            <div>
              <FiMail size={30} />
              <h3>editar email</h3>
            </div>
            <div>
              <FiTrash2 size={30} />
              <h3>deletar conta</h3>
            </div>
          </SettingsContainer>
        </Content>
      </App>
      <Image />
    </Container>
  );
};

export default Settings;
