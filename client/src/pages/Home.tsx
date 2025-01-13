import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io, { type Socket } from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import Chat from "@/components/Chat";
import SectionLayout from "@/components/layouts/SectionLayout";
import useAuth from "@/hooks/useAuth";
import useStore from "@/lib/store";
import type { Data } from "@/utils/interfaces";

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const socketUrl: string = "http://localhost:3000";
  let socket: Socket<any>;
  const { username } = useStore();
  const roomName = useParams().roomName;

  useAuth();

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
  }, [socketUrl, roomName]);

  return (
    <SectionLayout className="w-screen h-screen flex flex-row justify-start items-start p-0">
      <div className="h-screen min-h-screen flex flex-col justify-between p-8"></div>
      <div className="mx-10">
        <h1 className="text-2xl font-bold">{roomName}</h1>
        <Chat data={data} username={username} />
        <InputSendMessage socketUrl={socketUrl} username={username} />
      </div>
    </SectionLayout>
  );
}
