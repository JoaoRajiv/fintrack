import api from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
});

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
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(createdUser);
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
        const accessToken = loggedUser.tokens.accessToken;
        const refreshToken = loggedUser.tokens.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(loggedUser);
        toast.success('Login feito com sucesso.');
      },
      onError: (error) => {
        toast.error('Email ou senha inválidos, tente novamente.');
        console.log('Erro ao entrar na conta:', error);
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log('Erro ao obter usuário:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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
