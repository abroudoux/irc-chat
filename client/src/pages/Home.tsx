import { useEffect, useState } from "react";
import io from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import ListMessages from "@/components/ListMessages";
import useStore from "@/lib/store";
import type { Data } from "@/utils/interfaces";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const socketUrl: string = "http://localhost:3000";
  let socket: any;
  const { username } = useStore();

  // useAuth();

  useEffect(() => {
    socket = io(socketUrl);
    const handleReceiveMessage = (data: Data) => {
      setData((prevData) => [...prevData, data]);
    };
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.disconnect();
    };
  }, [socketUrl]);

  return (
    <div className="mx-10">
      <ListMessages data={data} />
      <InputSendMessage socketUrl={socketUrl} username={username} />
    </div>
  );
}
