import AddTransactionButton from '@/components/add-transation-button';
import Balance from '@/components/balance';
import DateSelection from '@/components/date-selection';
import Header from '@/components/header';
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
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
      <div className="space-y-6 p-8">
        {/* Parte do topo  */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
      </div>
    </>
  );
};

export default HomePage;
