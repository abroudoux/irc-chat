import type { User } from "@irc-chat/shared/types";

export default class AuthService {
  public static instance: AuthService = new AuthService();
  private API_URL: string;

  private constructor() {
    this.API_URL = "http://localhost:3000/api";
  }

  private getApiUrl(): string {
    return this.API_URL;
  }

  public async isUsernameAlreadyUsed(username: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.getApiUrl()}/users/${username}`);
      if (response.status === 409) {
        return true;
      }

      if (!response.ok) {
        throw new Error("Error while checking if username is already used.");
      }

      return false;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error while checking if username is already used.");
    }
  }

  public async connectUser(username: string): Promise<User> {
    try {
      const response = await fetch(`${this.getApiUrl()}/auth/${username}`);
      if (!response.ok) {
        throw new Error("Error while connecting user");
      }

      const data = await response.json();
      const userConnected: User = data.userConnected;

      return userConnected;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error while connecting user");
    }
  }
}
