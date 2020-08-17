import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { FiLogIn } from 'react-icons/fi';

import {
  Container,
  ModalStyle,
  Content,
  Image,
  CreateAccount,
  Forgot,
} from './styles';

const Login: React.FC = () => {
  const [forgotPassModalOpen, setForgotPassModalOpen] = useState(false);

  return (
    <Container>
      <ReactModal
        isOpen={forgotPassModalOpen}
        onRequestClose={() => setForgotPassModalOpen(false)}
        style={ModalStyle}
      >
        <h1 style={{ textAlign: 'center' }}>Opsss!</h1>
        <p style={{ marginTop: 15, textAlign: 'justify' }}>
          Sinto muito, mas essa aplicação ainda está em desenvolvimento, sendo
          assim você
          <b> ainda </b>
          não pode trocar sua senha!
          <br />
          Você ainda pode pedir ajuda ao suporte se precisar
        </p>
      </ReactModal>

      <Content>
        <form>
          <h1>Faça seu login!</h1>

          <input placeholder="usuário" />
          <input type="password" placeholder="senha" />

          <button type="button">entrar</button>

          <div>
            <Forgot to="/login" onClick={() => setForgotPassModalOpen(true)}>
              esqueceu sua senha?
            </Forgot>
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
