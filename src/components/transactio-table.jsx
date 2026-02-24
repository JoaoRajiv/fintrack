import { useGetTransactions } from '@/api/hooks/transaction';
import { useSearchParams } from 'react-router';

import { DataTable } from './ui/data-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatCurrency } from '@/helpers/currency';
import TransactionTypeBadge from './transaction-type-badge';
import { ScrollArea } from './ui/scroll-area';
import EditTransactionButton from './edit-transaction-button';

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
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
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />;
    },
  },
];

const TransactionTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const { data: transactions } = useGetTransactions({ from, to });
  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>
      <ScrollArea className="h-[500px] max-h-[500px] rounded-md border">
        <DataTable columns={columns} data={transactions || []} />
      </ScrollArea>
    </>
  );
};

export default TransactionTable;
