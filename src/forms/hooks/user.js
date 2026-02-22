import { useForm } from 'react-hook-form';
import { loginFormSchema } from '../schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return { form };
};
