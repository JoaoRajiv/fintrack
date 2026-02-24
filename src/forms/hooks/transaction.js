import { useForm } from 'react-hook-form';
import {
  createTransactionFormSchema,
  editTransactionFormSchema,
} from '../schemas/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateTransaction,
  useEditTransaction,
} from '@/api/hooks/transaction';
import { useEffect } from 'react';

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

const getEditTransacionFormDefaultValues = (transaction) => ({
  name: transaction.name,
  amount: parseFloat(transaction.amount),
  date: new Date(transaction.date),
  type: transaction.type,
});

export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: editTransaction } = useEditTransaction();
  const form = useForm({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: getEditTransacionFormDefaultValues(transaction),
    shouldUnregister: true,
  });
  useEffect(() => {
    form.reset(getEditTransacionFormDefaultValues(transaction));
    form.setValue('id', transaction.id);
  }, [form, transaction.id]);
  const onSubmit = async (data) => {
    await editTransaction(data);
    try {
      onSuccess();
    } catch (error) {
      console.log('Error editing transaction:', error);
      onError();
    }
  };
  return { form, onSubmit };
};
