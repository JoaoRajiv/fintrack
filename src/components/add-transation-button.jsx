import {
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { NumericFormat } from 'react-number-format';
import { DatePicker } from './ui/date-picker';

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  amount: z.number(),
  date: z.date({ required_error: 'A data é obrigatória.' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    errorMap: () => ({
      message: 'O tipo deve ser Ganho, Gasto ou Investimento',
    }),
  }),
});

const AddTransactionButton = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: undefined,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  });

  const onSubmit = (data) => {
    console.log('Dados da transação:', data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon />
            Nova transação
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Insira as informações abaixo.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome da transação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <NumericFormat
                        {...field}
                        getInputRef={field.ref}
                        customInput={Input}
                        placeholder="Digite o valor da transação"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        allowNegative={false}
                        onChange={() => {}}
                        onValueChange={(value) =>
                          field.onChange(value.floatValue)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          variant={
                            field.value === 'EARNING' ? 'secondary' : 'outline'
                          }
                          className={
                            field.value === 'EARNING'
                              ? 'border border-primary-green'
                              : ''
                          }
                          type="button"
                          onClick={() => field.onChange('EARNING')}
                        >
                          <TrendingUpIcon className="text-primary-green" />
                          Ganho
                        </Button>
                        <Button
                          variant={
                            field.value === 'EXPENSE' ? 'secondary' : 'outline'
                          }
                          type="button"
                          className={
                            field.value === 'EXPENSE'
                              ? 'border border-primary-red'
                              : ''
                          }
                          onClick={() => field.onChange('EXPENSE')}
                        >
                          <TrendingDownIcon className="text-primary-red" />
                          Gasto
                        </Button>
                        <Button
                          variant={
                            field.value === 'INVESTMENT'
                              ? 'secondary'
                              : 'outline'
                          }
                          type="button"
                          className={
                            field.value === 'INVESTMENT'
                              ? 'border border-primary-blue'
                              : ''
                          }
                          onClick={() => field.onChange('INVESTMENT')}
                        >
                          <PiggyBankIcon className="text-primary-blue" />
                          Invest.
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="space-x-4">
                <DialogClose asChild>
                  <Button variant="outline" type="reset" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransactionButton;
