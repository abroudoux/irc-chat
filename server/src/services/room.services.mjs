export default class RoomService {
  rooms = new Set();

  constructor() {}

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
