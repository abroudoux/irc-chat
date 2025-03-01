import type { User } from "@irc-chat/shared/types";
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

  public async handleCreateRoom(roomName: string, argument: string) {
    const response: boolean = await HttpService.instance.createRoom(argument);
    response
      ? SocketService.instance.sendMessage(
          "System",
          roomName,
          `Room ${argument} created.`
        )
      : SocketService.instance.sendMessage(
          "System",
          roomName,
          `Can't create room ${argument}.`
        );
  }

  public async handleDeleteRoom(roomName: string, argument: string) {
    const response: boolean = await HttpService.instance.deleteRoom(argument);
    response
      ? SocketService.instance.sendMessage(
          "System",
          roomName,
          `Room ${argument} deleted.`
        )
      : SocketService.instance.sendMessage(
          "System",
          roomName,
          `Can't delete room ${argument}.`
        );
  }

  public async handleGetUsers(roomName: string) {
    const users: User[] = await HttpService.instance.getUsersInRoom(roomName);
    const usersList: string[] = users.map((user: User) => user.username);
    SocketService.instance.sendMessage(
      "System",
      roomName,
      `Users in room: ${usersList.join(", ")}`
    );
  }

  public async handleQuitRoom(username: string, roomName: string) {
    const response: boolean = await HttpService.instance.quitRoom(
      username,
      roomName
    );
    response
      ? SocketService.instance.sendMessage(
          "System",
          roomName,
          `You have left the room.`
        )
      : SocketService.instance.sendMessage(
          "System",
          roomName,
          `Can't leave the room.`
        );
  }
}
