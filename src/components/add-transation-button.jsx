import {
  Loader2Icon,
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
import { Input } from './ui/input';
import { NumericFormat } from 'react-number-format';
import { DatePicker } from './ui/date-picker';
import { toast } from 'sonner';
import { useState } from 'react';
import { useCreateTransaction } from '@/api/hooks/transaction';
import { useCreateTransactionForm } from '@/forms/hooks/transaction';

const AddTransactionButton = () => {
  const { mutateAsync: createTransaction } = useCreateTransaction();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useCreateTransactionForm();

  const onSubmit = async (data) => {
    try {
      await createTransaction(data);
      toast.success(
        `Transação criada no dia ${data.date.toLocaleDateString()} com sucesso!`
      );
      setDialogIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Erro ao criar transação');
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
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
                        placeholder="Digite o valor da transação."
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
              <DialogFooter className="flex flex-col gap-4 sm:flex-row">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      Adicionando...
                    </>
                  ) : (
                    'Adicionar'
                  )}
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
