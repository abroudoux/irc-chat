import RoomService from "../src/services/room.service";
import { Room } from "../src/utils/types";

describe("RoomService", () => {
  let roomService: RoomService;

  beforeEach(() => {
    roomService = RoomService.getInstance();
    (roomService as any).rooms = [];
  });

  test("should create a new room", () => {
    const roomName = "Test Room";
    roomService.createRoom(roomName);

    const rooms: Room[] = roomService.getRooms();
    expect(rooms.length).toBe(1);
    expect(rooms[0].name).toBe(roomName);
  });

  test("should not create a room if it already exists", () => {
    const roomName = "Test Room";
    roomService.createRoom(roomName);
    roomService.createRoom(roomName);

    const rooms: Room[] = roomService.getRooms();
    expect(rooms.length).toBe(1);
  });

  test("should return an empty array if no rooms exist", () => {
    const rooms: Room[] = roomService.getRooms();
    expect(rooms).toEqual([]);
  });

  test("should log all rooms", () => {
    console.log = jest.fn();
    const roomName = "Test Room";
    roomService.createRoom(roomName);

    roomService.logAllRooms();

    expect(console.log).toHaveBeenCalledWith([{ name: roomName, users: [] }]);
  });
});
