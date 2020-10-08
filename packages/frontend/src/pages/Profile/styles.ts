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
  margin-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 520px;
  width: 100%;
  padding: 10px;
`;

export const ProfileCard = styled.div`
  min-height: 100px;
  padding: 0px 5px;
  display: flex;
  align-self: stretch;
  justify-self: stretch;
  margin-top: 65px;

  span {
    align-self: flex-end;

    svg:hover {
      cursor: pointer;
      color: #02c76b;
    }
  }
`;

export const ProfileImage = styled.div`
  min-height: 80px;
  min-width: 80px;

  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;

  border: 1px solid #0a0a0a;
  border-radius: 40px;

  background-color: #02c76b;
  color: #0a0a0a;
  font-weight: bold;
  font-size: 48px;
`;

export const ProfileContent = styled.div`
  padding: 5px 0px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 30px;

  > span {
    display: flex;
    align-self: start;

    h5 + h5 {
      margin-left: 20px;
    }

    h5 {
      font-size: 14px;
      font-weight: bold;
    }
  }

  > div {
    h3 {
      font-size: 26px;
      font-weight: bold;
    }

    h5 {
      font-size: 12px;
      font-weight: bold;
      color: #acacac;
    }
  }
`;

export const Image = styled.div`
  flex: 1;

  background: url(${backgroundSvg}) no-repeat center,
    linear-gradient(#121212, #0a0a0a);
  background-size: cover;
`;
