import UserService from "./user.service";
import RoomService from "./room.service";

export default class HttpService {
  private userService: UserService;
  private roomService: RoomService;

  public constructor(userService: UserService, roomService: RoomService) {
    this.userService = userService;
    this.roomService = roomService;
  }

  public getUserService(): UserService {
    return this.userService;
  }

  public getRoomService(): RoomService {
    return this.roomService;
  }
}
