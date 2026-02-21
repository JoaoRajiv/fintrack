import { useForm } from 'react-hook-form';
import { createTransactionFormSchema } from '../schemas/transaction';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateTransactionForm = () => {
  return useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: undefined,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  });
};
