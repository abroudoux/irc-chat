import { create } from "zustand";

import type { Store } from "@/utils/interfaces";

const useStore = create<Store>((set) => ({
  username: sessionStorage.getItem("username") || "",
  channelSelected: "",
  setUsername: (value) => {
    sessionStorage.setItem("username", value);
    set({ username: value });
  },
  setChannelSelected: (value) => set({ channelSelected: value }),
}));

export default useStore;
