import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';
import { UserService } from '@/api/services/user';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useLogin, useSignup } from '@/api/hooks/user';

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const signupMutation = useSignup();
  const loginMutation = useLogin();

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );
        if (!accessToken && !refreshToken) return;
        const response = await UserService.me();
        setUser(response);
      } catch (error) {
        setUser(null);
        console.log('Erro ao verificar autenticação:', error);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data);
      setUser(createdUser);
      setTokens(createdUser.tokens);
      toast.success(
        'Conta criada com sucesso! Faça login para acessar sua conta.'
      );
    } catch (error) {
      toast.error('Erro ao criar conta. Por favor, tente novamente.');
      console.log('Erro ao criar conta:', error);
    }
  };

  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data);
      setUser(loggedUser);
      setTokens(loggedUser.tokens);
      toast.success('Login feito com sucesso.');
    } catch (error) {
      toast.error('Erro ao entrar na conta. Verifique suas credenciais.');
      console.log('Erro ao entrar na conta:', error);
    }
  };

  const signOut = () => {
    setUser(null);
    removeTokens();
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, signOut, isInitializing }}
    >
      {children}
    </AuthContext.Provider>
  );
};
