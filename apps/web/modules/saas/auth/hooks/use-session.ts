import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@repo/firebase';

export const useSession = () => {
  const [user, loading, error] = useAuthState(auth);

  return {
    user,
    loading,
    error,
    session: user ? { user } : null,
  };
};
