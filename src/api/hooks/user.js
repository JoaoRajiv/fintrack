import { useAuthContext } from '@/context/auth';
import { UserService } from '@/api/services/user';
import { useQuery } from '@tanstack/react-query';

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId];
  }
  return ['balance', userId, from, to];
};

export const useGetUserBalance = (from, to) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: () => {
      return UserService.getBalance({ from, to });
    },
    // Refetch a cada 5 minutos
    staleTime: 1000 * 60 * 5,
    // Só fazer a requisição se tiver o from, to e user.id
    enabled: Boolean(from) && Boolean(to) && Boolean(user?.id),
  });
};
