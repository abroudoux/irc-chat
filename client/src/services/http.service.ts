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

  public async getRooms(): Promise<string[]> {
    try {
      const response = await fetch(`${this.apiUrl}/rooms`);
      if (!response.ok) {
        console.error("Failed to fetch rooms");
        return [];
      }

      const data = await response.json();

      if (data.roooms && Array.isArray(data.roooms)) {
        const roomsNames: string[] = data.roooms.map((room: Room) => room.name);
        return roomsNames;
      } else {
        console.error("Unexpected data structure");
        return [];
      }
    } catch (error: unknown) {
      console.error(error);
      return [];
    }
  }

  public async createRoom(roomName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/rooms/create/${roomName}`, {
        method: "POST",
      });
      if (!response.ok) {
        console.error("Failed to create room");
        return false;
      }

      return true;
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
  }

  public async deleteRoom(roomName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/rooms/delete/${roomName}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Failed to delete room");
        return false;
      }

      return true;
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
  }
}
