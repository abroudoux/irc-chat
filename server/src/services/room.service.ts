import type { User, Room } from "@irc-chat/shared/types";

export default class RoomService {
  private static instance: RoomService;
  private rooms: Room[];

  public constructor() {
    this.rooms = [];
  }

  public static getInstance(): RoomService {
    return RoomService.instance;
  }

  public getRooms(): Room[] {
    return this.rooms;
  }

  public getUsersInRoom(roomName: string): User[] {
    return this.getRoom(roomName)?.users || [];
  }

  public getRoom(roomName: string): Room | null {
    return this.getRooms().find((room) => room.name === roomName) || null;
  }

  public getRoomsOfUser(username: string): Room[] {
    return this.getRooms().filter((room) =>
      room.users.some((user) => user.username === username)
    );
  }

  public createRoom(roomName: string): boolean {
    if (this.isRoomAlreadyCreated(roomName)) {
      return false;
    }

    const roomCreated: Room = {
      name: roomName,
      users: [],
    };

    this.rooms.push(roomCreated);
    return true;
  }

  public deleteRoom(roomName: string): boolean {
    if (roomName === "hello") {
      return false;
    }

    const roomIndex = this.getRooms().findIndex(
      (room) => room.name === roomName
    );
    if (roomIndex === -1) {
      return false;
    }

    this.rooms.splice(roomIndex, 1);
    return true;
  }

  private isRoomAlreadyCreated(roomName: string) {
    return this.getRooms().some((room) => room.name === roomName);
  }

  public addUserToRoom(
    roomName: string,
    username: string,
    userId: string
  ): void {
    const room = this.getRoom(roomName);
    if (!room) {
      console.error(`Room ${roomName} not found`);
      return;
    }

    const newUser: User = {
      id: userId,
      username,
    };

    room?.users.push(newUser);
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
