export default class RoomService {
  rooms;
  static instance = new RoomService();

  constructor() {
    this.rooms = new Set();
  }

  addRoom(roomName) {
    if (this.isRoomAlreadyCreated(roomName)) {
      return;
    }

    this.rooms.add(roomName);
  }

  isRoomAlreadyCreated(roomName) {
    return this.rooms.has(roomName);
  }

  getRooms() {
    return Array.from(this.rooms);
  }

  logAllRooms() {
    console.log(this.getRooms());
  }
}
