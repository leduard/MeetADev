import React from 'react';

import { Container, App, Content, Image } from './styles';

import Header from '../../components/Header';

const Profile: React.FC = () => {
  return (
    <Container>
      <Image />
      <App>
        <Header showAppIcon />
        <Content>
          <h1>profile</h1>
        </Content>
      </App>
      <Image />
    </Container>
  );
};

export default Profile;
