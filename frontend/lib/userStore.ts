import { create } from 'zustand';

interface UserState {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

interface UserData {
  id: string;
  role: string;
  // Add more fields as needed
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
