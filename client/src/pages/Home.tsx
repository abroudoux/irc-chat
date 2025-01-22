import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import InputSendMessage from "@/components/InputSendMessage";
import Chat from "@/components/Chat";
import SectionLayout from "@/components/layouts/SectionLayout";
import BtnLogoutUser from "@/components/BtnLogoutUser";
import useAuth from "@/hooks/useAuth";
import useStore from "@/lib/store";
import type { Message } from "@/utils/interfaces";
import SocketService from "@/services/socket.services";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { username } = useStore();
  const roomName: string = useParams().roomName || "hello";

  useAuth();

  useEffect(() => {
    SocketService.instance.createUser(username);

    if (roomName) {
      SocketService.instance.joinRoom(roomName);
    } else {
      SocketService.instance.joinRoom("hello");
    }

    SocketService.instance.onUserJoined((username) => {
      const newMessage: Message = {
        author: username,
        content: `has joined the room ${roomName}`,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    SocketService.instance.onReceiveMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // return () => {
    //   SocketService.instance.getSocket().off("joined_room");
    //   SocketService.instance.disconnect();
    // };
  }, [SocketService.instance.getSocketUrl(), username]);

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
