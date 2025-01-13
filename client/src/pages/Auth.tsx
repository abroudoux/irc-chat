import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserService from "@/services/user.services";
import useStore from "@/lib/store";

const userService = new UserService();

export default function Auth() {
  const navigate = useNavigate();
  const { setUsername } = useStore();
  const [usernameState, setUsernameState] = useState<string>("");
  const [isUsernameAlreadyUsed, setIsUsernameAlreadyUsed] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function authentification(e: React.FormEvent) {
    e.preventDefault();
    if (usernameState.trim() === "") return;

    setIsLoading(true);

    const response = await userService.isUsernameAlreadyUsed(usernameState);
    if (!response) {
      console.error("Username already used");
      setIsUsernameAlreadyUsed(true);
      setIsLoading(false);
      return;
    }

    setUsername(usernameState);
    navigate("/");

    setIsLoading(false);
  }

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-semibold">
        Choose a pseudo to start chatting
      </h1>
      <form
        onSubmit={authentification}
        className="flex flex-row gap-2 items-center"
      >
        <Input
          type="text"
          placeholder="Your pseudo"
          className="max-w-lg"
          value={usernameState}
          onChange={(e) => setUsernameState(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Start chatting"}
        </Button>
      </form>
      {isUsernameAlreadyUsed && (
        <p className="text-red-500">Username already used</p>
      )}
    </section>
  );
}
