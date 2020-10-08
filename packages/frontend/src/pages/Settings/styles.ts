import styled from 'styled-components';
import { shade } from 'polished';

import backgroundSvg from '../../assets/background.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  color: #edebeb;
`;

export const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 520px;
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  margin-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 520px;
  width: 100%;
  padding: 20px;
`;

export const ProfileCard = styled.div`
  display: flex;
  align-self: center;
  justify-self: stretch;
  padding: 5px 30px;

  div > div {
    display: flex;
    align-items: center;

    svg {
      margin-left: 10px;
      transition: color 0.2s;
      cursor: pointer;

      &:hover {
        color: #02c76b;
      }
    }
  }

  h3,
  h5 {
    margin-left: 30px;
  }

  h3 {
    font-size: 26px;
    font-weight: bold;
  }

  h5 {
    font-size: 12px;
    font-weight: bold;
    color: #acacac;
  }
`;

export const ProfileImage = styled.div`
  min-height: 80px;
  min-width: 80px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 40px;

  background-color: #02c76b;
  color: #0a0a0a;

  font-size: 50px;
  font-weight: bold;
`;

export const SettingsContainer = styled.div`
  display: flex;
  height: 100%;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 50px;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s;

    h3 {
      font-size: 28px;
      margin-left: 45px;
    }

    &:hover {
      color: #02c76b;
    }
  }

  div + div {
    color: #da2f3a;
    /* margin-top: 100%; */

    &:hover {
      color: ${shade(0.5, '#da2f3a')};
    }
  }
`;

export const Image = styled.div`
  flex: 1;

  background: url(${backgroundSvg}) no-repeat center,
    linear-gradient(#121212, #0a0a0a);
  background-size: cover;
`;
