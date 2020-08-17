import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Image, CreateAccount, Forgot } from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <form>
          <h1>Faça seu login!</h1>

          <input placeholder="usuário" />
          <input type="password" placeholder="senha" />

          <button type="button">entrar</button>

          <div>
            <Forgot to="/">esqueceu sua senha?</Forgot>
          </div>
        </form>

        <CreateAccount to="/register">
          <FiLogIn />
          criar uma conta
        </CreateAccount>
      </Content>
      <Image />
    </Container>
  );
};

export default Login;
