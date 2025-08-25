import { useLocalStorage } from './useLocalStorage';

type User = {
  id: string;       // ou `id` selon ta structure
  email: string;
  name?: string;
  phone?: string;
  loyaltyPoints?: number;
  membershipLevel?: string;
};

export function useUser() {
  // Ici, on utilise useLocalStorage au lieu de useState
  // 'easyTripUser' est la clé dans localStorage
  const [user, setUser] = useLocalStorage<User | null>('easyTripUser', null);
  return { user, setUser };
}
