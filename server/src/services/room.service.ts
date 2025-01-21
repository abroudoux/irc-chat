export default class RoomService {
  private rooms: string[];
  private static instance: RoomService = new RoomService();

  private constructor() {
    this.rooms = [];
  }

  public static getInstance(): RoomService {
    return this.instance;
  }

  public getRooms(): string[] {
    return this.rooms;
  }

  public createRoom(roomName: string): void {
    if (this.isRoomAlreadyCreated(roomName)) {
      return;
    }

    this.rooms.push(roomName);
  }

  private isRoomAlreadyCreated(roomName: string) {
    return this.rooms.includes(roomName);
  }

  public logAllRooms(): void {
    console.log(this.getRooms());
  }
}
