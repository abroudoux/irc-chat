import type { Request, Response } from "express";

import type { User, Room } from "@irc-chat/shared/types";

import UserService from "./user.service";
import RoomService from "./room.service";

export default class HttpService {
  private userService: UserService;
  private roomService: RoomService;
  private userConnected: User | null = null;

  public constructor(userService: UserService, roomService: RoomService) {
    this.userService = userService;
    this.roomService = roomService;
  }

  public getUsers = (_: Request, res: Response): void => {
    const users: User[] = this.userService.getUsers();
    res.json({ users: users });
  };

  public getUsersInRoom = (req: Request, res: Response): void => {
    const { roomName } = req.params;
    const users: User[] = this.roomService.getUsersInRoom(roomName);
    res.json({ users: users });
  };

  public getRooms = (_: Request, res: Response): void => {
    const rooms: Room[] = this.roomService.getRooms();
    res.json({ roooms: rooms });
  };

  public getRoomsOfUser = (req: Request, res: Response): void => {
    const { username } = req.params;
    const rooms: Room[] = this.roomService.getRoomsOfUser(username);
    res.json({ rooms: rooms });
  };

  public createRoom = (req: Request, res: Response): void => {
    const { roomName } = req.params;
    const roomCreated: boolean = this.roomService.createRoom(roomName);

    if (this.getUserConnected()) {
      this.roomService.addUserToRoom(
        this.getUserConnected()?.username ?? "",
        roomName,
        this.getUserConnected()?.id ?? ""
      );
    }

    res.status(roomCreated ? 201 : 409);
    res.json({ roomCreated: roomCreated });
  };

  public deleteRoom = (req: Request, res: Response): void => {
    const { roomName } = req.params;
    const roomDeleted: boolean = this.roomService.deleteRoom(roomName);

    res.status(roomDeleted ? 200 : 404);
    res.json({ roomDeleted: roomDeleted });
  };

  public getUserConnected(): User | null {
    return this.userConnected;
  }

  public setUserConnected(user: User): void {
    this.userConnected = user;
  }

  public isUsernameAlreadyUsed = (req: Request, res: Response): void => {
    const { username } = req.params;
    const usernameAlreadyUsed: boolean =
      this.userService.isUsernameAlreadyUsed(username);

    res.status(usernameAlreadyUsed ? 409 : 200);
    res.json({ usernameAlreadyUsed: usernameAlreadyUsed });
  };

  public connectUser = (req: Request, res: Response): void => {
    const { username } = req.params;
    const userConnected: User = this.userService.createUser(username);

    this.setUserConnected(userConnected);

    res.status(201);
    res.json({ userConnected: userConnected });
  };
}
