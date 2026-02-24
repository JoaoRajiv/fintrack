import { useForm } from 'react-hook-form';
import {
  createTransactionFormSchema,
  editTransactionFormSchema,
  // editTransactionFormSchema,
} from '../schemas/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateTransaction,
  useEditTransaction,
} from '@/api/hooks/transaction';

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction } = useCreateTransaction();
  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    try {
      await createTransaction(data);
      onSuccess();
    } catch (error) {
      console.log('Error creating transaction:', error);
      onError();
    }
  };
  return { form, onSubmit };
};

export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: editTransaction } = useEditTransaction();
  const form = useForm({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: {
      id: transaction.id,
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    },
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    await editTransaction(data);
    try {
      onSuccess();
    } catch (error) {
      console.log('Error creating transaction:', error);
      onError();
    }
  };
  return { form, onSubmit };
};
