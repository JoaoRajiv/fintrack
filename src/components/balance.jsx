import { useSearchParams } from 'react-router';
import {
  PiggyBank,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react';
import BalanceItem from './balance-item';
import { useGetUserBalance } from '@/api/hooks/user';

const Balance = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const { data } = useGetUserBalance(from, to);
  return (
    <div className="mt-6 grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Patrimônio"
        value={data?.balance ?? 0}
        icon={<WalletIcon size={16} />}
      />
      <BalanceItem
        label="Ganhos"
        value={data?.earnings ?? 0}
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
      />
      <BalanceItem
        label="Gastos"
        value={data?.expenses ?? 0}
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
      />
      <BalanceItem
        label="Saldo"
        value={data?.balance ?? 0}
        icon={<PiggyBank className="text-primary-blue" size={16} />}
      />
    </div>
  );
};

export default Balance;
