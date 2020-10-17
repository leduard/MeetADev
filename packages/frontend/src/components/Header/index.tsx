import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiHome, FiSettings } from 'react-icons/fi';

import {
  Container,
  ProfileImage,
  IconImageButton,
  NavButtons,
  NavLink,
  Logout,
} from './styles';

import { useAuth } from '../../context/Auth';

import Icon from '../../assets/icon.svg';

interface HeaderComponent {
  showAppIcon?: boolean;
}

const Header: React.FC<HeaderComponent> = ({
  showAppIcon,
}: HeaderComponent) => {
  const history = useHistory();
  const { signOut } = useAuth();

  return (
    <Container>
      <div>
        {!showAppIcon ? (
          <ProfileImage>
            <h1>L</h1>
          </ProfileImage>
        ) : (
          <IconImageButton onClick={(): void => history.push('/')}>
            <img src={Icon} alt="appIcon" />
          </IconImageButton>
        )}
      </div>
      <NavButtons>
        <NavLink to="/">
          <FiHome size={24} />
          home
        </NavLink>
        <NavLink to="/settings">
          <FiSettings size={24} />
          ajustes
        </NavLink>
      </NavButtons>
      <Logout onClick={() => signOut()} />
    </Container>
  );
};

export default Header;
