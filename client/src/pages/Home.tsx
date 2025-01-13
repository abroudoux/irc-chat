import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io, { type Socket } from "socket.io-client";

import InputSendMessage from "@/components/InputSendMessage";
import Chat from "@/components/Chat";
import ListChannels from "@/components/ListChannels";
import SectionLayout from "@/components/layouts/SectionLayout";
import BtnCreateRoom from "@/components/BtnCreateRoom";
import useStore from "@/lib/store";
import type { Data } from "@/utils/interfaces";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [_, setChannelExists] = useState<boolean>(true);
  const socketUrl: string = "http://localhost:3000";
  let socket: Socket<any>;
  const { username, channelSelected } = useStore();
  const channelName = useParams().channelName;
  const navigate = useNavigate();

  const checkChannelExists = (channelName: string) => {
    const existingChannels = ["channel1", "channel2", "channel3"];
    return existingChannels.includes(channelName);
  };

  // useAuth();

  useEffect(() => {
    if (channelName && !checkChannelExists(channelName)) {
      setChannelExists(false);
      navigate("/");
      return;
    }

    socket = io(socketUrl);
    const handleReceiveMessage = (data: Data) => {
      setData((prevData) => [...prevData, data]);
    };
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.disconnect();
    };
  }, [socketUrl, channelName, navigate]);

  return (
    <SectionLayout className="w-screen h-screen flex flex-row justify-start items-start p-0">
      <div className="h-screen min-h-screen flex flex-col justify-between p-8">
        <ListChannels />
        <BtnCreateRoom />
      </div>
      <div className="mx-10">
        <h1 className="text-2xl font-bold">{channelName}</h1>
        <Chat data={data} username={username} />
        <InputSendMessage socketUrl={socketUrl} username={username} />
      </div>
    </SectionLayout>
  );
}
