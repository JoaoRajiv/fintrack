import { useAuthContext } from '@/context/auth';
import { Navigate } from 'react-router';

const HomePage = () => {
  const { user, isInitializing } = useAuthContext();
  if (isInitializing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Carregando...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <h1>Home</h1>;
};

export default HomePage;
