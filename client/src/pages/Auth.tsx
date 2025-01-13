import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

export default function Auth() {
  const navigate = useNavigate();
  const { setUsername } = useStore();
  const [pseudo, setPseudo] = useState<string>("");

  function authentification() {
    if (pseudo.length === 0) return;
    setUsername(pseudo);
    console.log("Username set to:", pseudo);
    navigate("/");
  }

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-semibold">
        Choose a pseudo to start chatting
      </h1>
      <form className="flex flex-row gap-2 items-center">
        <Input
          type="text"
          placeholder="Your pseudo"
          className="max-w-lg"
          onChange={(e) => {
            e.preventDefault();
            setPseudo(e.target.value);
          }}
        />
        <Button type="submit" onClick={authentification}>
          Start chatting
        </Button>
      </form>
    </section>
  );
}
