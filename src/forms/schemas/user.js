import z from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .trim()
    .min(1, { message: 'O email é obrigatório' }),
  password: z.string(),
});
