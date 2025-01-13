import { useState } from "react";
import io from "socket.io-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InputSendMessage({
  socketUrl,
  username,
}: {
  socketUrl: string;
  username: string;
}) {
  const [message, setMessage] = useState<string>("");
  const socket = io(socketUrl);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (message.length === 0) return;
    socket.emit("send_message", { username, message });
    setMessage("");
  }

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2 fixed bottom-5 justify-center"
      onSubmit={sendMessage}
    >
      <Input
        type="text"
        placeholder="Your message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
