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
  const [logs, setLogs] = useState<string[]>([]);
  const socketUrl: string = "http://localhost:3000";
  const { username } = useStore();

  useAuth();

  useEffect(() => {
    SocketService.instance.onReceiveLogs((log) => {
      setLogs((prevLogs) => [...prevLogs, log]);
    });

    SocketService.instance.onReceiveMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    SocketService.instance.joinHelloRoom(username);

    // return () => {
    //   SocketService.instance.disconnect();
    // };
  }, [socketUrl, username]);

  return (
    <SectionLayout className="w-screen h-screen flex flex-row justify-start items-start p-0">
      <div className="mx-10">
        <Chat messages={messages} username={username} logs={logs} />
        <InputSendMessage socket={SocketService.instance} username={username} />
      </div>
    </SectionLayout>
  );
}
