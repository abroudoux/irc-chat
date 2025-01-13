import { useEffect, useState } from "react";
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

  useAuth();

  useEffect(() => {
    socket = io(socketUrl);

    socket.emit("join_hello_room", username);
    socket.on("receive_message", (messageData: Data) => {
      setData((prevData) => [...prevData, messageData]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socketUrl, username]);

  return (
    <SectionLayout className="w-screen h-screen flex flex-row justify-start items-start p-0">
      <div className="mx-10">
        <Chat data={data} username={username} />
        <InputSendMessage socketUrl={socketUrl} username={username} />
      </div>
    </SectionLayout>
  );
}
