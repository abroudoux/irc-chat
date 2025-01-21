export type User = {
  id: string;
  username: string;
};

export type Room = {
  name: string;
  users: User[];
};
