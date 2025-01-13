export interface Store {
  isConnected: boolean;
  username: string;
  setIsConnected: (value: boolean) => void;
  setUsername: (value: string) => void;
}

interface Data {
  message: string;
  username: string;
}

export interface ChatProps {
  username: string;
  data: Data[];
}

export interface InputSendMessageProps {
  socketUrl: string;
  username: string;
}
