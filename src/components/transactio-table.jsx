import { useGetTransactions } from '@/api/hooks/transaction';
import { useSearchParams } from 'react-router';

import { DataTable } from './ui/data-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatCurrency } from '@/helpers/currency';
import { CircleIcon } from 'lucide-react';
import TransactionTypeBadge from './transaction-type-badge';

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Descrição',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge type={transaction.type} />;
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
];

const TransactionTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const { data: transactions } = useGetTransactions({ from, to });
  return <DataTable columns={columns} data={transactions || []} />;
};

export default TransactionTable;
