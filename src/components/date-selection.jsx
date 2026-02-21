import { useEffect, useState } from 'react';
import { DatePickerWithRange } from './ui/date-picker-with-range';
import { addMonths, format } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '@/context/auth';

const DateSelection = () => {
  const queryclient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  });
  // Sempre que o state "date" for atualizado, eu preciso persisti-lo na URL.
  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const queryParams = new URLSearchParams();
    const from = queryParams.set('from', format(date.from, 'yyyy-MM-dd'));
    const to = queryParams.set('to', format(date.to, 'yyyy-MM-dd'));
    queryclient.invalidateQueries({
      queryKey: ['balance', user.id, from, to],
    });
    navigate(`/?${queryParams.toString()}`);
  }, [date, navigate, user.id, queryclient]);
  // Quando a página for carregada, eu preciso ler os parâmetros da URL e atualizar o state "date" com esses valores.
  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
