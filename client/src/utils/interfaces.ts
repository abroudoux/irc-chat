export interface Store {
  isConnected: boolean;
  username: string;
  setIsConnected: (value: boolean) => void;
  setUsername: (value: string) => void;
}
