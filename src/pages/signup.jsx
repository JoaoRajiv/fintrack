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
import { Link } from 'react-router';

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>
            Insira seus dados para criar uma nova conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Primeiro Nome" />
          <Input placeholder="Sobrenome" />
          <Input placeholder="Email" type="email" />
          <PasswordInput />
          <PasswordInput placeholder={'Confirme sua senha'} />
          <div className="items-top flex gap-2">
            <Checkbox id="terms" name="terms-checkbox-basic" />
            <label
              htmlFor="terms-checkbox-basic"
              className="text-xs text-muted-foreground opacity-75"
            >
              Ao clicar em "Criar conta", você concorda com o nosso{' '}
              <a href="" className="text-white underline">
                Termo de Serviço e Política de Privacidade.
              </a>
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
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
