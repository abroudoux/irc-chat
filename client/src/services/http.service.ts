import type { User, Room } from "@irc-chat/shared/types";

export default class HttpService {
  public static instance = new HttpService();
  private apiUrl: string;

  public constructor() {
    this.apiUrl = "http://localhost:3000/api";
  }

  public static getInstance(): HttpService {
    return this.instance;
  }

  public getApiUrl(): string {
    return this.apiUrl;
  }

  public async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${this.apiUrl}/users`);
      if (!response.ok) {
        console.error("Failed to fetch users");
        return [];
      }

      const data = await response.json();
      return data.users as User[];
    } catch (error: unknown) {
      console.error(error);
      return [];
    }
  }

  public async getRooms(): Promise<Room[]> {
    try {
      const response = await fetch(`${this.apiUrl}/rooms`);
      if (!response.ok) {
        console.error("Failed to fetch rooms");
        return [];
      }

      const data = await response.json();
      return data.rooms as Room[];
    } catch (error: unknown) {
      console.error(error);
      return [];
    }
  }
}
