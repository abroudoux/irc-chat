import { Socket } from "socket.io-client";

export interface Store {
  username: string;
  channelSelected: string;
  setUsername: (value: string) => void;
  setChannelSelected: (value: string) => void;
}

export interface Message {
  content: string;
  author: string;
}

export interface ChatProps {
  username: string;
  messages: Message[];
  logs: string[];
}

export interface InputSendMessageProps {
  socket: any;
  username: string;
}

export interface SectionLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export interface ListRoomsProps {
  rooms: string[];
}

export interface useIsUsernameAlreadyUsedProps {
  username: string;
  socketUrl: string;
}
