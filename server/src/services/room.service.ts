import type { User, Room } from "@irc-chat/shared/types";

export default class RoomService {
  private static instance: RoomService = new RoomService();
  private rooms: Room[];

  public constructor() {
    this.rooms = [];
  }

  public static getInstance(): RoomService {
    return this.instance;
  }

  public getRooms(): Room[] {
    return this.rooms;
  }

  public getRoom(roomName: string): Room | null {
    return this.getRooms().find((room) => room.name === roomName) || null;
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

  public addUserToRoom(roomName: string, user: User): void {
    const room = this.getRoom(roomName);
    if (!room) {
      console.error(`Room ${roomName} not found`);
      return;
    }

    room?.users.push(user);
  }

  public logAllRooms(): void {
    console.log("ALL ROOMS:");
    console.log(this.getRooms());
  }

  public logUsersFromRoom(roomName: string): void {
    console.log(`USERS FROM ROOM ${roomName}:`);
    const room = this.getRoom(roomName);
    if (!room) {
      console.error(`Room ${roomName} not found`);
      return;
    }

    console.log(room.users);
  }

  public removeUserFromRooms(socketId: string): void {
    this.getRooms().forEach((room) => {
      room.users = room.users.filter((user) => user.id !== socketId);
    });
  }
}
