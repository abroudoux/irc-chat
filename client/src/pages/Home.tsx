import { useEffect, useState } from "react";
import io, { type Socket } from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import Chat from "@/components/Chat";
import ListChannels from "@/components/ListChannels";
import useStore from "@/lib/store";
import type { Data } from "@/utils/interfaces";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const socketUrl: string = "http://localhost:3000";
  let socket: Socket<any>;
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
    <section className="w-screen h-screen flex flex-row justify-start items-start">
      <ListChannels />
      <div className="mx-10">
        <Chat data={data} username={username} />
        <InputSendMessage socketUrl={socketUrl} username={username} />
      </div>
    </section>
  );
}
