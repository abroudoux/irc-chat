export default class UserService {
  users = new Set();

  constructor() {}

  addUser(username) {
    if (this.isUserAlreadyCreated(username)) {
      return;
    }

    this.users.add(username);
  }

  isUserAlreadyCreated(username) {
    return this.users.has(username);
  }

  getUsers() {
    return Array.from(this.users);
  }
}
