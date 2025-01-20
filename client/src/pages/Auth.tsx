import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

export default function Auth() {
  const navigate = useNavigate();
  const { setUsername } = useStore();
  const [usernameState, setUsernameState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function auth(e: FormEvent) {
    e.preventDefault();
    if (usernameState.trim() === "") return;
    setIsLoading(true);
    setUsername(usernameState);
    navigate("/");
    setIsLoading(false);
  }

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-semibold">
        Choose a pseudo to start chatting
      </h1>
      <form onSubmit={auth} className="flex flex-row gap-2 items-center">
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
    </section>
  );
}
