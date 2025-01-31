import type { User } from "@irc-chat/shared/types";

interface AuthServiceResponse {
  userCreated: User | null;
  error: boolean;
  errorMessage: string | null;
}

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
      const userCreated: User = data.userCreated;

      return userCreated;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error while connecting user");
    }
  }

  public async createUser(username: string): Promise<AuthServiceResponse> {
    try {
      const response = await fetch(`${this.getApiUrl()}/auth/${username}`);
      if (response.status === 409) {
        return {
          userCreated: null,
          error: true,
          errorMessage: "Username already used",
        };
      }

      if (!response.ok) {
        throw new Error("Error while creating user");
      }

      const data = await response.json();
      const userCreated: User = data.userCreated;

      return {
        userCreated: userCreated,
        error: false,
        errorMessage: null,
      };
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error while creating user");
    }
  }
}
