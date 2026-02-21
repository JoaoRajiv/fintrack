import { useEffect, useState } from 'react';
import { DatePickerWithRange } from './ui/date-picker-with-range';
import { addMonths, format } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router';

const DateSelection = () => {
  const [searchParams] = useSearchParams();
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
    queryParams.set('from', format(date.from, 'yyyy-MM-dd'));
    queryParams.set('to', format(date.to, 'yyyy-MM-dd'));
    navigate(`/?${queryParams.toString()}`);
  }, [date, navigate]);
  // Quando a página for carregada, eu preciso ler os parâmetros da URL e atualizar o state "date" com esses valores.
  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
