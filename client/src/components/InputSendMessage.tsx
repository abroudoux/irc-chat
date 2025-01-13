import { useState } from "react";
import io from "socket.io-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InputSendMessage({ socketUrl }: { socketUrl: string }) {
  const [message, setMessage] = useState<String>("");
  const socket = io(socketUrl);

  if (!socket) return;

  function sendMessage() {
    if (message.length === 0) return;
    socket.emit("send_message", { message: message });
  }

  return (
    <form className="flex w-full max-w-sm items-center space-x-2 fixed bottom-5 justify-center">
      <Input
        type="text"
        placeholder="Your message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button type="submit" onClick={sendMessage}>
        Send
      </Button>
    </form>
  );
}
