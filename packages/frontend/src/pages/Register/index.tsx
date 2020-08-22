import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, Content, Image, Login } from './styles';

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

        <Login to="/login">
          <FiArrowLeft />
          já tenho uma conta!
        </Login>
      </Content>
    </Container>
  );
};

export default Register;
