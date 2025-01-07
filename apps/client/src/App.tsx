import { useEffect, useState } from "react";
import io from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";

export default function App() {
  const [messageReceived, setMessageReceived] = useState<String>("");
  const [allMessages, setAllMessages] = useState<String[]>([]);
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
      {allMessages.map((message, index) => (
        <h1 key={index}>{message}</h1>
      ))}
      <InputSendMessage socketUrl={socketUrl} />
      <h1>Message: {messageReceived}</h1>
    </>
  );
}
