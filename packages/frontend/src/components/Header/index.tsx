import React from 'react';
import { FiHome, FiSettings } from 'react-icons/fi';

import { Container, ProfileImage, NavButtons, NavLink, Logout } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <div>
        <ProfileImage>
          <h1>L</h1>
        </ProfileImage>
      </div>
      <NavButtons>
        <NavLink to="/">
          <FiHome size={24} />
          home
        </NavLink>
        <NavLink to="settings">
          <FiSettings size={24} />
          ajustes
        </NavLink>
      </NavButtons>
      <Logout />
    </Container>
  );
};

export default Header;
