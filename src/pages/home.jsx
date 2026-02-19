import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth';
import { Loader2Icon } from 'lucide-react';
import { Navigate } from 'react-router';

const HomePage = () => {
  const { user, isInitializing, signOut } = useAuthContext();
  if (isInitializing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-2">
        <Loader2Icon className="animate-spin" />
        Carregando ...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <h1>Olá, {user.first_name}!</h1>
      <Button onClick={signOut}>Sair</Button>
    </>
  );
};

export default HomePage;
