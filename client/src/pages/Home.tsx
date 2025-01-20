import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();

  useAuth();

  useEffect(() => {
    const socket = SocketService.instance;

    socket.onUserAlreadyExists(() => {
      navigate("/auth");
    });

    socket.onReceiveMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.onUserJoined((username) => {
      const newMessage: Message = {
        author: username,
        content: `has joined the room ${roomName}`,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    if (roomName) {
      socket.joinRoom(username, roomName);
    } else {
      socket.joinRoom(username, "hello");
    }

    return () => {
      socket.offFromRoom("joined_room");
      socket.offFromRoom("receive_message");
    };
  }, [SocketService.instance.getSocketUrl(), username]);

  return (
    <SectionLayout className="w-screen h-screen flex flex-row justify-start items-start">
      <div className="h-full flex flex-col items-center justify-end">
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
