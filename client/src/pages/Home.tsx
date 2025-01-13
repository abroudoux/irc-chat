import { useEffect, useState } from "react";
import io from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import ListMessages from "@/components/ListMessages";
import useStore from "@/lib/store";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const socketUrl: string = "http://localhost:3000";
  let socket: any;
  const { username } = useStore();

  // useAuth();

  useEffect(() => {
    socket = io(socketUrl);

    const handleReceiveMessage = (data: any) => {
      setAllMessages((prevMessages) => [...prevMessages, data.message]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.disconnect();
    };
  }, [socketUrl]);

  return (
    <div className="mx-10">
      <ListMessages messages={allMessages} />
      <InputSendMessage socketUrl={socketUrl} username={username} />
    </div>
  );
}
