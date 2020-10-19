import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  username: string;
  name: string;
}

interface UserData {
  user: User;
  token: string;
}

interface AuthError {
  error: string;
  status: number;
}

interface AuthContextState {
  user: UserData;
  signIn(username: string, password: string): Promise<void | AuthError>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData>(
    (): UserData => {
      const newUser = localStorage.getItem('@lesocial:user');

      if (newUser) return JSON.parse(newUser);

      return {} as UserData;
    },
  );

  const signIn = useCallback(async (username, password) => {
    try {
      const { data }: { data: UserData } = await api.post('/sessions', {
        username,
        password,
      });

      localStorage.setItem('@lesocial:user', JSON.stringify(data));
      setUser(data);

      return undefined;
    } catch (err) {
      const {
        data: { error },
        status,
      } = err.response;

      return { error, status };
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@lesocial:user');
    setUser({} as UserData);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
