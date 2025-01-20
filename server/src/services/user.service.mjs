export default class UserService {
  users;

  constructor() {
    this.users = new Set();
  }

  addUser(username) {
    if (this.isUserAlreadyCreated(username)) {
      return;
    }

    this.users.add(username);
    this.logUsers();
  }

  isUserAlreadyCreated(username) {
    return this.users.has(username);
  }

  getUsers() {
    return Array.from(this.users);
  }

  logUsers() {
    console.log("Users:", this.getUsers());
  }
}
