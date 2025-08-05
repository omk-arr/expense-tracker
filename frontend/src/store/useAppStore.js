import { create } from 'zustand';

const useAppStore = create((set) => ({
  isAuthenticated: false,
  isMobile: false,

  // Actions
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsMobile: (value) => set({ isMobile: value }),
}));

export default useAppStore;
