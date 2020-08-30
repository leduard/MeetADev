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
  Spinner,
} from './styles';

import { useAuth } from '../../context/Auth';

const Login: React.FC = () => {
  const [forgotPassModalOpen, setForgotPassModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ error: string; status: number } | null>(
    null,
  );
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

    setLoading(true);

    const res = await signIn(username, password);

    if (res) setError(res);

    setLoading(false);
  }, [signIn, username, password]); //eslint-disable-line

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1>Faça seu login!</h1>
          {error && <h5>{error.error}</h5>}

          <input
            placeholder="usuário"
            onChange={(e): void => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="senha"
            onChange={(e): void => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {!loading ? 'entrar' : <Spinner />}
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
