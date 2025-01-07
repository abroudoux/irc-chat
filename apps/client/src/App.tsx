import { useEffect, useState } from "react";
import io from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import ListMessages from "@/components/ListMessages";

export default function App() {
  const [messageReceived, setMessageReceived] = useState<string>("");
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const socketUrl: string = "http://localhost:3000";
  const socket = io(socketUrl);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      setAllMessages([...allMessages, data.message]);
    });
  }, [socket]);

  return (
    <>
      <ListMessages messages={allMessages} />
      <InputSendMessage socketUrl={socketUrl} />
      <h1>Message: {messageReceived}</h1>
    </>
  );
}
