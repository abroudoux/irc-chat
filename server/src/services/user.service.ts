import { v4 as uuidv4 } from "uuid";

import type { User } from "@irc-chat/shared/types";

export default class UserService {
  private static instance: UserService;
  private users: User[];

  public constructor() {
    this.users = [];
  }

  public static getInstance(): UserService {
    return UserService.instance;
  }

  public getUser(user: User): User | null {
    return this.getUsers().find((u) => u.id === user.id) || null;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public createUser(username: string): User {
    const id: string = uuidv4();
    const userCreated: User = {
      id,
      username,
    };
    this.users.push(userCreated);

    return userCreated;
  }

  public removeUser(username: string, userId: string): void {
    this.users = this.users.filter((user) => user.username !== username);
    this.users = this.users.filter((user) => user.id !== userId);
    console.log(`User ${username} - ${userId} removed.`);
    console.log("ALL USERS:");
    console.log(this.getUsers());
  }

  public isUsernameAlreadyUsed(username: string): boolean {
    return this.getUsers().some((user) => user.username === username);
  }

  public isUserAlreadyExists(userId: string): boolean {
    return this.getUsers().some((user) => user.id === userId);
  }

  public logAllUsers(): void {
    console.log("ALL USERS:");
    console.log(this.getUsers());
  }
}
