import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Image, CreateAccount, Forgot } from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <form>
          <h1>Faça seu login!</h1>

          <input placeholder="username" />
          <input type="password" placeholder="password" />

          <button type="button">Entrar</button>

          <div>
            <Forgot to="/">Esqueceu sua senha?</Forgot>
          </div>
        </form>

        <CreateAccount to="/register">
          <FiLogIn />
          Criar uma conta
        </CreateAccount>
      </Content>
      <Image />
    </Container>
  );
};

export default Login;
