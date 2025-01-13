export default class UserService {
  private username: string = "";
  private baseUrl: string = "http://localhost:3000";

  public _constructor(username: string) {
    this.username = username;
  }

  public async isUsernameAlreadyUsed(username: string): Promise<boolean> {
    try {
      const response: Response = await fetch(
        `${this.baseUrl}/users/username/${username}`
      );
      const data: any = await response.json();
      return !data.isUsernameAvailable;
    } catch (error: unknown) {
      console.error("Error in UserService.isUsernameAlreadyUsed()", error);
      return false;
    }
  }
}
