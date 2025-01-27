import type { User } from "@irc-chat/shared/types";

const API_URL: string = "http://localhost:3000/api";

export interface AuthServiceResponse {
  user: User | null;
  error: boolean;
  errorMessage: string | null;
}

export async function isUsernameAlreadyUsed(
  username: string
): Promise<boolean | Error> {
  try {
    const response = await fetch(`${API_URL}/users/${username}`);
    return response.ok;
  } catch (error: unknown) {
    console.error(error);
    return new Error("Error while checking if username is already used");
  }
}

export async function connectUser(
  username: string
): Promise<AuthServiceResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/${username}`);
    if (response.status === 409) {
      return {
        user: null,
        error: true,
        errorMessage:
          "This username is already used, please choose another one.",
      };
    }

    if (!response.ok) {
      return {
        user: null,
        error: true,
        errorMessage: "Error while connecting user",
      };
    }

    const userCreated: User = await response.json();
    return {
      user: userCreated,
      error: false,
      errorMessage: null,
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      user: null,
      error: true,
      errorMessage: "Error while connecting user",
    };
  }
}
