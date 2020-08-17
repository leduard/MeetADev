import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, Content, Image, CreateAccount, Forgot } from './styles';

const Register: React.FC = () => {
  return (
    <Container>
      <Image />
      <Content>
        <form>
          <h1>Crie sua conta!</h1>

          <input placeholder="nome" />
          <input placeholder="usuário" />
          <input placeholder="email" />
          <div>
            <input type="password" placeholder="senha" />
            <input type="password" placeholder="confirmar senha" />
          </div>

          <button type="button">criar</button>
        </form>

        <CreateAccount to="/login">
          <FiArrowLeft />
          já tenho uma conta!
        </CreateAccount>
      </Content>
    </Container>
  );
};

export default Register;
