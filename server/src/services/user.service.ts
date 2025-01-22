import type { User } from "@irc-chat/shared/types";

export default class UserService {
  private static instance = new UserService();
  private users: User[];

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UserService {
    return this.instance;
  }

  public getUser(user: User): User | null {
    return this.getUsers().find((u) => u.id === user.id) || null;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public createUser(id: string, username: string): User {
    const userCreated: User = {
      id,
      username,
    };
    this.users.push(userCreated);

    return userCreated;
  }

  public removeUser(userId: string): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  public isUsernameAlreadyUsed(username: string): boolean {
    return this.getUsers().some((user) => user.username === username);
  }

  public logAllUsers(): void {
    console.log("ALL USERS:");
    console.log(this.getUsers());
  }
}
