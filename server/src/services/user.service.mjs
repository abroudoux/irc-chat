export default class UserService {
  users;
  static instance = new UserService();

  constructor() {
    this.users = [];
  }

  addUserToRoom(username, roomName) {
    if (this.isUserAlreadyRegistered(username)) {
      return;
    }

    if (this.isUserAlreadyInRoom(username, roomName)) {
      return;
    }

    this.users.push({ username, roomName });
  }

  isUserAlreadyRegistered(username) {
    return this.users.some((user) => user.username === username);
  }

  isUserAlreadyInRoom(username, roomName) {
    return this.users.some(
      (user) => user.username === username && user.roomName === roomName
    );
  }

  isUserAlreadyCreated(username) {
    return this.users.has(username);
  }

  getUsers() {
    return this.users;
  }

  logAllUsers() {
    console.log("Users from UserService:", this.getUsers());
  }
}
