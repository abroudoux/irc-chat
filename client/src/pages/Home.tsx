import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import InputSendMessage from "@/components/InputSendMessage";
import Chat from "@/components/Chat";
import SectionLayout from "@/components/layouts/SectionLayout";
import BtnLogoutUser from "@/components/BtnLogoutUser";
import useAuth from "@/hooks/useAuth";
import useStore from "@/lib/store";
import type { Message } from "@/utils/interfaces";
import SocketService from "@/services/socket.service";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { username } = useStore();
  const roomName: string = useParams().roomName || "hello";

  useAuth();

  useEffect(() => {
    SocketService.instance.joinRoom(roomName);

    const handleMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    SocketService.instance.onReceiveMessage(handleMessage);

    return () => {
      SocketService.instance.offFromRoom(roomName);
      SocketService.instance.getSocket().off("receive_message", handleMessage);
    };
  }, [roomName]);

  return (
    <SectionLayout className="w-screen h-screen flex flex-row justify-start items-start">
      <div className="h-full flex flex-col items-center justify-end pb-8">
        <BtnLogoutUser />
      </div>
      <div>
        <Chat messages={messages} username={username} roomName={roomName} />
        <InputSendMessage
          socket={SocketService.instance}
          username={username}
          roomName={roomName}
        />
      </div>
    </SectionLayout>
  );
}
