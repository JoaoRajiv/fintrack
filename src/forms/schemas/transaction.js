import z from 'zod';

export const createTransactionFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  amount: z.number({ required_error: 'O valor é obrigatório.' }),
  date: z.date({ required_error: 'A data é obrigatória.' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    errorMap: () => ({
      message: 'O tipo deve ser Ganho, Gasto ou Investimento',
    }),
  }),
});
