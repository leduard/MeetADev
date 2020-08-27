import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
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

import { useAuth } from '../../context/Auth';

const Login: React.FC = () => {
  const [forgotPassModalOpen, setForgotPassModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    signIn,
    user: { user },
  } = useAuth();

  const handleSubmit = useCallback(async () => {
    if (
      username === '' ||
      username === ' ' ||
      password === '' ||
      password === ' '
    )
      return;

    const res = await signIn(username, password);
  }, [signIn]); //eslint-disable-line

  return user ? (
    <Redirect to="/home" />
  ) : (
    <Container>
      <ReactModal
        isOpen={forgotPassModalOpen}
        onRequestClose={(): void => setForgotPassModalOpen(false)}
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

          <input
            placeholder="usuário"
            onChange={(e): void => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="senha"
            onChange={(e): void => setPassword(e.target.value)}
          />

          <button type="button" onClick={(): Promise<void> => handleSubmit()}>
            entrar
          </button>

          <div>
            <Forgot
              to="/login"
              onClick={(): void => setForgotPassModalOpen(true)}
            >
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
