import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionLayout from "@/components/layouts/SectionLayout";
import type { InputSendMessageProps } from "@/utils/interfaces";

export default function InputSendMessage(props: InputSendMessageProps) {
  const [message, setMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (message.length === 0) return;
    const username: string = props.username;
    const roomName: string = props.roomName;
    props.socket.sendMessage(roomName, username, message);
    setMessage("");
  }

  return (
    <SectionLayout>
      <form
        className="flex w-full items-center space-x-2 fixed bottom-8 justify-start"
        onSubmit={sendMessage}
      >
        <Input
          ref={inputRef}
          type="text"
          className="max-w-screen-sm"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
        <p className="text-muted-foreground">
          You're currently connected as{" "}
          <span className="text-primary">{props.username}</span>
        </p>
      </form>
    </SectionLayout>
  );
}
