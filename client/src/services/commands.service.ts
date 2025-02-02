import HttpService from "@/services/http.service";
import SocketService from "@/services/socket.service";

export default class CommandsService {
  public static instance: CommandsService = new CommandsService();

  private constructor() {}

  public async handleGetRooms(roomName: string) {
    const roomsNames: string[] = await HttpService.instance.getRooms();
    SocketService.instance.sendMessage(
      "System",
      roomName,
      `Available rooms: ${roomsNames.join(", ")}`
    );
  }

  public handleChangeUsername(
    username: string,
    newUsername: string,
    roomName: string
  ) {
    SocketService.instance.sendMessage(
      username,
      roomName,
      `${username} changed their username to ${newUsername}.`
    );
  }
}
