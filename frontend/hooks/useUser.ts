import create from 'zustand';

// Define Zustand store for user state
interface UserState {
  user: any; // Adjust the type according to your actual user data structure
  setUser: (userData: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export function useUser() {
  return useUserStore((state) => state);
}
