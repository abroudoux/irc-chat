export default class UserService {
  users;
  static instance = new UserService();

  constructor() {
    this.users = [];
  }

  addUserToRoom(username, roomName) {
    if (!this.canAddUser(username)) {
      return;
    }

    this.users.push({ username, roomName });
  }

  getUsers() {
    return this.users;
  }

  canAddUser(username) {
    return !this.users.some((user) => user.username === username);
  }

  logAllUsers() {
    console.log("Users from UserService:", this.getUsers());
  }

  removeUser(username) {
    this.users = this.users.filter((user) => user.username !== username);
  }
}
