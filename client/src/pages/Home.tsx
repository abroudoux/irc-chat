import { useEffect, useState } from "react";

import InputSendMessage from "@/components/InputSendMessage";
import Chat from "@/components/Chat";
import SectionLayout from "@/components/layouts/SectionLayout";
import useAuth from "@/hooks/useAuth";
import useStore from "@/lib/store";
import type { Message } from "@/utils/interfaces";
import SocketService from "@/services/socket.services";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { username } = useStore();

  useAuth();

  useEffect(() => {
    SocketService.instance.onReceiveMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    SocketService.instance.onUserJoined((user) => {
      const newMessage: Message = {
        author: user,
        content: "has joined the room",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    SocketService.instance.joinHelloRoom(username);
  }, [SocketService.instance.getSocketUrl(), username]);

  return (
    <SectionLayout className="w-screen h-screen flex flex-row justify-start items-start p-0">
      <div className="mx-10">
        <Chat messages={messages} username={username} />
        <InputSendMessage socket={SocketService.instance} username={username} />
      </div>
    </SectionLayout>
  );
}
