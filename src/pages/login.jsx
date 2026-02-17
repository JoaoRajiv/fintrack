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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/context/auth';
import api from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import z from 'zod';

const signupSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .trim()
    .min(1, { message: 'O email é obrigatório' }),
  password: z.string(),
});

const LoginPage = () => {
  const { user: userTest, login } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        const accessToken = loggedUser.tokens.accessToken;
        const refreshToken = loggedUser.tokens.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(loggedUser);
        toast.success('Login feito com sucesso.');
      },
      onError: (error) => {
        toast.error('Email ou senha inválidos, tente novamente.');
        console.log('Erro ao entrar na conta:', error);
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    toast.success('Logout feito com sucesso.');
  };

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log('Erro ao obter usuário:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    };
    init();
  }, []);

  if (user) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">Bem-vindo, {user.first_name}!</h1>
        <p className="text-muted-foreground">
          Você entrou na sua conta com sucesso. Agora você pode acessar o
          dashboard.
        </p>
        <Button variant="outline" onClick={handleLogout}>
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
              <CardTitle>Faça login na sua conta</CardTitle>
              <CardDescription>
                Insira seus dados para fazer login.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full">Entrar</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Não tem uma conta?</p>
        <Button variant="link">
          <Link to="/signup">Crie uma conta</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
