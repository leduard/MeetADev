import React from 'react';
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

const Settings: React.FC = () => {
  return (
    <Container>
      <Image />
      <App>
        <Header showAppIcon />
        <Content>
          <ProfileCard>
            <ProfileImage>L</ProfileImage>
            <div>
              <div>
                <h3>Luiz Eduardo</h3>
                <FiEdit size={20} />
              </div>
              <h5>@leduardo</h5>
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
