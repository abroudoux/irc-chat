import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { isUsernameAlreadyUsed } from "@/services/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

export default function Auth() {
  const navigate = useNavigate();
  const { setUsername } = useStore();
  const [usernameState, setUsernameState] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function authenticateUser(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const username: string = usernameState;

    if (username.trim() === "") {
      setErrorMessage("Please enter a valid username.");
      setIsLoading(false);
      return;
    }

    const usernameAlreadyUsed: boolean = await isUsernameAlreadyUsed(username);
    if (usernameAlreadyUsed) {
      setErrorMessage(
        "This username is already used, please choose another one."
      );
      setIsLoading(false);
      return;
    }

    setUsername(username);
    room.trim() === "" ? navigate("/") : navigate(`/${room}`);
    setIsLoading(false);
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
          value={room}
          onChange={(e) => setRoom(e.target.value)}
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
