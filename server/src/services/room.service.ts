import { Room } from "../utils/types";

export default class RoomService {
  private rooms: Room[];
  private static instance: RoomService = new RoomService();

  private constructor() {
    this.rooms = [];
  }

  public static getInstance(): RoomService {
    return this.instance;
  }

  public getRooms(): Room[] {
    return this.rooms;
  }

  public createRoom(roomName: string): void {
    if (this.isRoomAlreadyCreated(roomName)) {
      return;
    }

    const roomCreated: Room = {
      name: roomName,
      users: [],
    };

    this.rooms.push(roomCreated);
  }

  private isRoomAlreadyCreated(roomName: string) {
    return this.getRooms().some((room) => room.name === roomName);
  }

  public logAllRooms(): void {
    console.log(this.getRooms());
  }
}
