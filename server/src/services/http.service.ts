import type { Request, Response } from "express";

import UserService from "./user.service";
import RoomService from "./room.service";

import type { User } from "@irc-chat/shared/types";

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
}
