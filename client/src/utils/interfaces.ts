import { Room } from "@irc-chat/shared/types";

export interface Store {
  userId: string;
  username: string;
  channelSelected: string;
  setUserId: (value: string) => void;
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
  roomName: string;
}

export interface InputSendMessageProps {
  socket: any;
  username: string;
  roomName: string;
}

export interface SectionLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export interface ListRoomsProps {
  rooms: string[];
}

export interface useIsUsernameAlreadyUsedProps {
  socket: any;
  username: string;
}

export enum Commands {
  NickName,
  List,
  Create,
  Delete,
  Join,
  Quit,
  Users,
  Msg,
}
