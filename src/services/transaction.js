import { api } from '@/lib/axios';

export const TransactionService = {
  /**
   * Cria uma nova transação com os dados fornecidos.
   * @param {Object} input - Dados da transação.
   * @param {string} input.name - Nome da transação.
   * @param {number} input.amount - Valor da transação.
   * @param {Date} input.date - Data da transação (yyyy-MM-dd).
   * @param {string} input.type - Tipo da transação (EARNING, EXPENSE, INVESTMENT).
   * @returns {Object} - Dados da transação criada.
   */
  create: async (input) => {
    const response = await api.post('/transactions/me', input);
    return response.data;
  },
  /**
   * Obtém a lista de transações do usuário autenticado.
   * @param {Object} input - Dados para filtrar as transações.
   * @param {string} input.from - Data Inicial (yyyy-MM-dd).
   * @param {string} input.to - Data Final (yyyy-MM-dd).
   * @returns {} - Lista de transações do usuário.
   */
  list: async () => {},
};
