import api from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken';
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refreshToken';

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser);
        setTokens(createdUser.tokens);
        toast.success(
          'Conta criada com sucesso! Faça login para acessar sua conta.'
        );
      },
      onError: (error) => {
        toast.error('Erro ao criar conta. Por favor, tente novamente.');
        console.log('Erro ao criar conta:', error);
      },
    });
  };

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser);
        setTokens(loggedUser.tokens);
        toast.success('Login feito com sucesso.');
      },
      onError: (error) => {
        toast.error('Email ou senha inválidos, tente novamente.');
        console.log('Erro ao entrar na conta:', error);
      },
    });
  };

  const logout = () => {
    removeTokens();
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        removeTokens();
      }
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
