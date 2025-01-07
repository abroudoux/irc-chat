import { useEffect, useState } from "react";
import io from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import ListMessages from "@/components/ListMessages";

export default function App() {
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const socketUrl: string = "http://localhost:3000";
  const socket = io(socketUrl);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessages([...allMessages, data.message]);
    });
  }, [socket]);

  return (
    <div className="mx-10">
      <ListMessages messages={allMessages} />
      <InputSendMessage socketUrl={socketUrl} />
    </div>
  );
}
