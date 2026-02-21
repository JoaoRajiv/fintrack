import { useEffect, useState } from 'react';
import { DatePickerWithRange } from './ui/date-picker-with-range';
import { addMonths, format, isValid } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '@/context/auth';

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  if (!from || !to) {
    return defaultDate;
  }
  const dateAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to));
  if (dateAreInvalid) {
    return defaultDate;
  }
  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  };
};

const DateSelection = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  const [date, setDate] = useState(getInitialDateState(searchParams));
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
