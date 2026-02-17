import { Link } from 'react-router';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AuthContext } from '@/context/auth';
import { useContext } from 'react';

const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: 'O primeiro nome é obrigatório' }),
    lastName: z.string().min(1, { message: 'O sobrenome é obrigatório' }),
    email: z
      .string()
      .email({ message: 'Email inválido' })
      .trim()
      .min(1, { message: 'O email é obrigatório' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve conter pelo menos 6 caracteres' }),
    confirmPassword: z.string().min(6, {
      message: 'A confirmação de senha deve conter pelo menos 6 caracteres',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos de serviço',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const SignupPage = () => {
  const { user, signup, logout } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const handleSubmit = (data) => {
    signup(data);
  };

  if (user) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">Bem-vindo, {user.first_name}!</h1>
        <p className="text-muted-foreground">
          Sua conta foi criada com sucesso. Você já pode acessar o dashboard.
        </p>
        <Button variant="outline" onClick={logout}>
          Sair
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>
                Insira seus dados para criar uma nova conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* PRIMEIRO NOME */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Primeiro Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SOBRENOME */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SENHA  */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CONFIRME SUA SENHA  */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TERMOS DE USO */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={
                          form.formState.errors.terms && 'border-red-500'
                        }
                      />
                    </FormControl>
                    <div className="leading-none">
                      <label
                        htmlFor="terms"
                        className={`text-xs text-muted-foreground opacity-75 ${form.formState.errors.terms && 'text-red-500'}`}
                      >
                        Ao clicar em “Criar conta”, você aceita nosso{' '}
                        <a
                          href="#"
                          className={`text-white underline ${form.formState.errors.terms && 'text-red-500'}`}
                        >
                          termo de uso e política de privacidade.
                        </a>
                      </label>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Já tem uma conta?</p>
        <Button variant="link">
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
