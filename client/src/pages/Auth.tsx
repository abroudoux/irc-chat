import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

export default function Auth() {
  const navigate = useNavigate();
  const { setUsername } = useStore();
  const [usernameState, setUsernameState] = useState<string>("");

  function authentification(e: React.FormEvent) {
    e.preventDefault();
    if (usernameState.trim() === "") return;
    setUsername(usernameState);
    navigate("/");
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
        <Button type="submit">Start chatting</Button>
      </form>
    </section>
  );
}
