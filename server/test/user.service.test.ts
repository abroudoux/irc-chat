import { v4 as uuidv4 } from "uuid";

import UserService from "../src/services/user.service";

jest.mock("uuid");

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    (uuidv4 as jest.Mock).mockReturnValue("mocked-uuid");
  });

  test("getUser should return null for non-existent user", () => {
    const result = userService.getUser({
      id: "non-existent",
      username: "test",
    });
    expect(result).toBeNull();
  });

  test("getUsers should return initial user", () => {
    const users = userService.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0]).toEqual({ id: "1", username: "arthur" });
  });

  test("createUser should add a new user", () => {
    const newUser = userService.createUser("testuser");
    expect(newUser).toEqual({ id: "mocked-uuid", username: "testuser" });
    expect(userService.getUsers()).toHaveLength(2);
  });

  test("removeUser should remove a user", () => {
    userService.createUser("testuser");
    userService.removeUser("testuser", "mocked-uuid");
    expect(userService.getUsers()).toHaveLength(1);
  });

  test("isUsernameAlreadyUsed should return true for existing username", () => {
    expect(userService.isUsernameAlreadyUsed("arthur")).toBe(true);
  });

  test("isUserAlreadyExists should return true for existing user id", () => {
    expect(userService.isUserAlreadyExists("1")).toBe(true);
  });

  test("logAllUsers should not throw an error", () => {
    expect(() => userService.logAllUsers()).not.toThrow();
  });
});
