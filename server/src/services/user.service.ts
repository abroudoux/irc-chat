import type { User } from "../utils/types";

export default class UserService {
  private static instance = new UserService();
  private users: User[];

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UserService {
    return this.instance;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public createUser(id: string, username: string): boolean {
    if (this.isUserNameAlreadyUsed(username)) {
      return false;
    }

    const userToAdd: User = {
      id,
      username,
      rooms: [],
    };
    this.users.push(userToAdd);

    return true;
  }

  private isUserNameAlreadyUsed(usernameProvided: string): boolean {
    return this.getUsers().some((user) => user.username === usernameProvided);
  }

  public logAllUsers(): void {
    console.log(this.getUsers());
  }
}
