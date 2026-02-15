import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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
          <div className="relative">
            <Input
              placeholder="Senha"
              type={showPassword ? 'text' : 'password'}
            />
            <Button
              variant="ghost"
              className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 rounded-full p-0 text-muted-foreground"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
            </Button>
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
