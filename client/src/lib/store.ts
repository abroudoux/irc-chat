import { create } from "zustand";

import type { Store } from "@/utils/interfaces";

const useStore = create<Store>((set) => ({
  userId: sessionStorage.getItem("userId") || "",
  username: sessionStorage.getItem("username") || "",
  channelSelected: "",
  setUserId: (value) => {
    sessionStorage.setItem("userId", value);
    set({ userId: value });
  },
  setUsername: (value) => {
    sessionStorage.setItem("username", value);
    set({ username: value });
  },
  setChannelSelected: (value) => set({ channelSelected: value }),
}));

export default useStore;
