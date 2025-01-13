import { create } from "zustand";

import type { Store } from "@/utils/interfaces";

const useStore = create<Store>((set) => ({
  isConnected: false,
  username: "Martin",
  setIsConnected: (value) => set({ isConnected: value }),
  setUsername: (value) => set({ username: value }),
}));

export default useStore;
