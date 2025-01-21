export type UserConnected = {
  username: string;
  roomName: string;
  socketId: string;
};

export type User = {
  id: string;
  username: string;
};

export type Room = {
  name: string;
  users: User[];
};
