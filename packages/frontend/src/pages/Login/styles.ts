import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import backgroundSvg from '../../assets/background.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  color: #fff7f8;
`;

export const StyledToastContainer = styled(ToastContainer).attrs({
  toastClassName: 'toast',
  progressClassName: 'progress',
})`
  width: 320px;
  color: #0a0a0a;

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

  .toast {
    background-color: #02c76b;
  }

  .progress {
    background-color: #edebeb;
  }

  button[aria-label='close'] {
    color: #0a0a0a;
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
    width: 320px;
    text-align: center;

    h1 {
      margin-bottom: 30px;
      font-weight: 500;
    }

    h5 {
      margin-bottom: 30px;
      font-weight: 500;
      color: #da2f3a;
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
    }
  }
`;

export const Image = styled.div`
  flex: 1;

  background: url(${backgroundSvg}) no-repeat center,
    linear-gradient(#121212, #0a0a0a);
  background-size: cover;
`;

export const Forgot = styled(Link)`
  color: #edebeb;
  text-decoration: none;
  font-weight: 400;
  transition: color 0.2s;

  &:hover {
    color: ${shade(0.3, '#edebeb')};
  }
`;

export const CreateAccount = styled(Link)`
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

export const ModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    border: 'none',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    maxWidth: 400,
    border: 'none',
    borderRadius: 10,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#edebeb',
  },
};
