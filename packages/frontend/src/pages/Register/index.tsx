import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Image, CreateAccount, Forgot } from './styles';

const Register: React.FC = () => {
  return (
    <Container>
      <Image />
      <Content>
        <form>
          <h1>Crie sua conta!</h1>

          <input placeholder="username" />
          <input type="password" placeholder="password" />

          <button type="button">Criar</button>
        </form>

        <CreateAccount to="/login">
          <FiLogIn />
          Já tenho uma conta!
        </CreateAccount>
      </Content>
    </Container>
  );
};

export default Register;
