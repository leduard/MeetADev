import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

import {
  Container,
  StyledToastContainer,
  Content,
  Image,
  Login,
} from './styles';

import Spinner from '../../components/Spinner';

import api from '../../services/api';

interface Error {
  path: string;
  message: string;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleSubmit = useCallback(async () => {
    const data = {
      name,
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O Nome é obrigatório'),
        username: Yup.string().min(3, 'Usuário deve ter no minimo 3 letras'),
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'A senha deve ter no minimo 6 digitos'),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'As senhas precisam ser iguais',
        ),
      });

      await schema.validate(data, { abortEarly: false });

      setLoading(true);
      await api.post('/users', data);
      setLoading(false);

      history.push('/login', { success: true });
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors: Error[] = [];

        err.inner.forEach((error) => {
          errors.push({ path: error.path, message: error.message } as Error);
        });

        toast.error(
          <StyledToastContainer>
            <h3>Erros encontrados nos campos</h3>
            {errors.map((e) => (
              <h5>{e.message}</h5>
            ))}
          </StyledToastContainer>,
        );

        return;
      }

      toast.error(
        <StyledToastContainer>
          <h3>Ocorreu um erro durante a criação da sua conta</h3>
          <h5>Tente novamente</h5>
        </StyledToastContainer>,
      );
    }
  }, [confirmPassword, email, history, name, password, username]);

  return (
    <Container>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Image />
      <Content>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1>Crie sua conta!</h1>

          <input
            placeholder="nome"
            onChange={(e): void => setName(e.target.value)}
          />
          <input
            placeholder="usuário"
            onChange={(e): void => setUsername(e.target.value)}
          />
          <input
            placeholder="email"
            onChange={(e): void => setEmail(e.target.value)}
          />
          <div>
            <input
              type="password"
              placeholder="senha"
              onChange={(e): void => setpassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirmar senha"
              onChange={(e): void => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {!loading ? 'criar' : <Spinner />}
          </button>
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
