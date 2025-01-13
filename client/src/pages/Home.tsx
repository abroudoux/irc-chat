import { useEffect, useState } from "react";
import io from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import ListMessages from "@/components/ListMessages";
import useStore from "@/lib/store";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const socketUrl: string = "http://localhost:3000";
  const socket = io(socketUrl);
  const { username } = useStore();

  // useAuth();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessages((prevMessages) => [...prevMessages, data.message]);
    });
  }, [socket]);

  return (
    <div className="mx-10">
      <ListMessages messages={allMessages} />
      <InputSendMessage socketUrl={socketUrl} />
      <p>{username}</p>
    </div>
  );
}
