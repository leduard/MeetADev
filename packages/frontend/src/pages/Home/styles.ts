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
  padding: 20px;
`;

export const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 120px;

  @media (max-width: 1920px) {
    width: 390px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }

  textarea {
    height: 80px;

    resize: none;

    border: none;
    border-radius: 10px;
    padding: 10px;

    background-color: #edebeb;
    color: #0a0a0a;
    font-size: 18px;
    font-weight: 600;
  }

  button {
    display: flex;
    justify-content: center;
    align-self: flex-end;
    padding: 5px 10px;
    height: 32px;
    width: 100px;

    border-radius: 10px;
    border: 0;
    background-color: #02c76b;

    margin-top: 5px;
    font-weight: bold;

    transition: background-color 0.2s;
    &:hover {
      background-color: ${shade(0.3, '#02c76b')};
    }
  }
`;

export const PostsContainer = styled.div`
  margin-top: 50px;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Image = styled.div`
  flex: 1;

  background: url(${backgroundSvg}) no-repeat center,
    linear-gradient(#121212, #0a0a0a);
  background-size: cover;
`;
