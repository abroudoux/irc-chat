import type { Request, Response } from "express";

import UserService from "./user.service";
import RoomService from "./room.service";

import type { User, Room } from "@irc-chat/shared/types";

export default class HttpService {
  private userService: UserService;
  private roomService: RoomService;

  public constructor(userService: UserService, roomService: RoomService) {
    this.userService = userService;
    this.roomService = roomService;
  }

  public getUsers = (req: Request, res: Response): void => {
    const users: User[] = this.userService.getUsers();
    res.json(users);
  };

  public getRooms = (req: Request, res: Response): void => {
    const rooms: Room[] = this.roomService.getRooms();
    res.json(rooms);
  };

  public isUsernameAlreadyUsed = (req: Request, res: Response): void => {
    const { username } = req.params;
    const usernameAlreadyUsed: boolean =
      this.userService.isUsernameAlreadyUsed(username);

    res.json({ usernameAlreadyUsed: usernameAlreadyUsed });
  };
}
