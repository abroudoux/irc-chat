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
      const response = await fetch(`${this.baseUrl}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName }),
      });

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error: unknown) {
      console.error("Error creating room", error);
    }
    return undefined;
  }
}
