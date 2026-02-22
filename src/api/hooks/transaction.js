import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TransactionService } from '../services/transaction';
import { getUserBalanceQueryKey } from './user';
import { useAuthContext } from '@/context/auth';

export const createTransactionMutationKey = ['createTransaction'];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => {
      return TransactionService.create(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({
          userId: user.id,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: ['getTransactions', user.id],
      });
    },
  });
};

export const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId];
  }
  return ['getTransactions', userId, from, to];
};

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user?.id),
  });
};
