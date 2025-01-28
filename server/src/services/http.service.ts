import type { Request, Response } from "express";

import type { User, Room } from "@irc-chat/shared/types";

import UserService from "./user.service";
import RoomService from "./room.service";

export default class HttpService {
  private userService: UserService;
  private roomService: RoomService;

  public constructor(userService: UserService, roomService: RoomService) {
    this.userService = userService;
    this.roomService = roomService;
  }

  public getUsers = (_: Request, res: Response): void => {
    const users: User[] = this.userService.getUsers();
    res.json(users);
  };

  public getRooms = (_: Request, res: Response): void => {
    const rooms: Room[] = this.roomService.getRooms();
    res.json(rooms);
  };

  public isUsernameAlreadyUsed = (req: Request, res: Response): void => {
    const { username } = req.params;
    const usernameAlreadyUsed: boolean =
      this.userService.isUsernameAlreadyUsed(username);

    res.status(usernameAlreadyUsed ? 409 : 200);
    res.json({ usernameAlreadyUsed: usernameAlreadyUsed });
  };

  public connectUser = (req: Request, res: Response): User | null => {
    const { username } = req.params;
    const usernameAlreadyUsed: boolean =
      this.userService.isUsernameAlreadyUsed(username);
    const userCreated: User | null = usernameAlreadyUsed
      ? null
      : this.userService.createUser(username);

    res.status(usernameAlreadyUsed ? 409 : 200);
    res.json({ userCreated: userCreated });

    return userCreated ?? null;
  };
}
