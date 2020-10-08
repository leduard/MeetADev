import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

import backgroundSvg from '../../assets/background.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  color: #fff7f8;
`;

export const StyledToastContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3,
  h5 {
    font-family: 'Maven Pro', sans-serif;
  }

  h3 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  h5 {
    font-weight: 400;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 520px;

  form {
    margin: 80px 0;
    width: 325px;
    text-align: center;

    h1 {
      margin-bottom: 30px;
      font-weight: 500;
    }

    input {
      padding: 5px 10px;
      height: 42px;
      width: 100%;

      border-radius: 10px;
      border: 2px solid #edebeb;
      background-color: #edebeb;

      text-align: center;
      font-weight: 500;

      & + input {
        margin-top: 10px;
      }
    }

    button {
      padding: 5px 10px;
      height: 42px;
      width: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 10px;
      border: 0;
      background-color: #02c76b;

      margin-top: 15px;
      font-weight: 500;

      transition: background-color 0.2s;

      &:hover {
        background-color: ${shade(0.3, '#02c76b')};
      }

      &:disabled {
        cursor: default;
        background-color: ${shade(0.5, '#02c76b')};
      }
    }

    div {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      input {
        width: 49%;
        margin-top: 0;
      }
    }
  }
`;

export const Image = styled.div`
  flex: 1;

  background: url(${backgroundSvg}) no-repeat center,
    linear-gradient(#121212, #0a0a0a);
  background-size: cover;
`;

export const Login = styled(Link)`
  color: #02c76b;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: ${shade(0.3, '#02c76b')};
  }

  svg {
    margin-right: 10px;
  }
`;
