export class RoomService {
  private baseUrl: string = "http://localhost:3000";

  _constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async doesRoomExists(roomName: string): Promise<boolean | undefined> {
    try {
      return true;
    } catch (error: unknown) {
      console.error("Error checking if room exists", error);
    }
    return undefined;
  }

  public async createRoom(roomName: string): Promise<boolean | undefined> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roomName }),
      });

      if (!response.ok) return false;

      return true;
    } catch (error: unknown) {
      console.error("Error creating room", error);
    }
    return undefined;
  }

  public async getRooms(): Promise<string[] | undefined> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/rooms`, {
        method: "GET",
      });

      if (!response.ok) return undefined;

      const rooms: string[] = await response.json();
      return rooms;
    } catch (error: unknown) {
      console.error("Error getting rooms", error);
    }
    return undefined;
  }
}
