import { api } from '@/lib/axios';

export const UserService = {
  /**
   * Cria um novo usuário com os dados fornecidos.
   * @param {Object} input - Dados do usuário.
   * @param {string} input.firstName - Primeiro nome do usuário.
   * @param {string} input.lastName - Sobrenome do usuário.
   * @param {string} input.email - Email do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} - Dados do usuário criado, incluindo tokens de autenticação.
   */
  signUp: async (input) => {
    const response = await api.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  /**
   * Faz login de um usuário com os dados fornecidos.
   * @param {Object} input - Dados do usuário para login.
   * @param {string} input.email - Email do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} - Dados do usuário logado, incluindo tokens de autenticação.
   */
  login: async (input) => {
    const response = await api.post('/users/login', {
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  /**
   * Obtém os dados do usuário atualmente autenticado.
   * @returns {Object} - Dados do usuário autenticado.
   */
  me: async () => {
    const response = await api.get('/users/me');
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    };
  },
};
