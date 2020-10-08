import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export const Container = styled.div`
  height: 80px;
  max-width: 520px;
  width: 100%;
  padding: 10px;

  display: flex;
  position: fixed;

  background-color: #0a0a0a;

  align-items: center;
  justify-content: space-between;

  color: #edebeb;
`;

export const NavButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const ProfileImage = styled.div`
  height: 52px;
  width: 52px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 26px;

  background-color: #02c76b;
  color: #0a0a0a;

  h1 {
    font-weight: bold;
  }
`;

export const IconImageButton = styled.button`
  background: none;
  border: none;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #edebeb;
  transition: color 0.2s;

  font-size: 20px;
  font-weight: bold;

  svg {
    margin-right: 10px;
  }

  &:hover {
    color: #02c76b;
  }
`;

export const Logout = styled(FiLogOut).attrs({ size: 32 })`
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #02c76b;
  }
`;
