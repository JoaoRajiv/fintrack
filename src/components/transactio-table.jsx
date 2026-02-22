import { useGetTransactions } from '@/api/hooks/transaction';
import { useSearchParams } from 'react-router';

import { DataTable } from './ui/data-table';

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Descrição',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
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
