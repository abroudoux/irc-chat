import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "@/services/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

export default function Auth() {
  const navigate = useNavigate();
  const { setUsername } = useStore();
  const [usernameState, setUsernameState] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function authenticateUser(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const username: string = usernameState.trim();
      if (username === "") {
        setErrorMessage("Please enter a valid username.");
        return;
      }

      const usernameAlreadyUsed: boolean =
        await AuthService.instance.isUsernameAlreadyUsed(username);
      if (usernameAlreadyUsed) {
        setErrorMessage(
          "This username is already used, please choose another one."
        );
        return;
      }

      setUsername(username);
      roomName.trim() === "" ? navigate("/") : navigate(`/${roomName}`);
    } catch (error) {
      console.error("An error occurred during authentication:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-semibold">
        Choose a pseudo to start chatting
      </h1>
      <form
        onSubmit={authenticateUser}
        className="flex flex-row gap-2 items-center"
      >
        <Input
          type="text"
          placeholder="Your pseudo"
          className="max-w-lg"
          value={usernameState}
          onChange={(e) => setUsernameState(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter a room (optional)"
          className="max-w-lg"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Start chatting"}
        </Button>
      </form>
      {errorMessage && (
        <p className="text-red-500 font-semibold text-base">{errorMessage}</p>
      )}
    </section>
  );
}
