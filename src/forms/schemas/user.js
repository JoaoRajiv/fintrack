import z from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .trim()
    .min(1, { message: 'O email é obrigatório' }),
  password: z.string(),
});

export const signupFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'O primeiro nome é obrigatório' }),
    lastName: z.string().min(1, { message: 'O sobrenome é obrigatório' }),
    email: z
      .string()
      .email({ message: 'Email inválido' })
      .trim()
      .min(1, { message: 'O email é obrigatório' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve conter pelo menos 6 caracteres' }),
    confirmPassword: z.string().min(6, {
      message: 'A confirmação de senha deve conter pelo menos 6 caracteres',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos de serviço',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
