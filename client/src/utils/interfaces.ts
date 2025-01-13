export interface Store {
  username: string;
  channelSelected: string;
  setUsername: (value: string) => void;
  setChannelSelected: (value: string) => void;
}

export interface Data {
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

export interface SectionLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export interface ListRoomsProps {
  rooms: string[];
}
