import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionLayout from "@/components/layouts/SectionLayout";
import type { InputSendMessageProps } from "@/utils/interfaces";

export default function InputSendMessage(props: InputSendMessageProps) {
  const [message, setMessage] = useState<string>("");

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (message.length === 0) return;
    const username: string = props.username;
    props.socket.sendMessage(username, message);
    setMessage("");
  }

  return (
    <SectionLayout>
      <form
        className="flex w-full items-center space-x-2 fixed bottom-5 justify-start"
        onSubmit={sendMessage}
      >
        <Input
          type="text"
          className="max-w-screen-sm"
          placeholder="Your message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button type="submit">Send</Button>
        <span>You're currently connected as {props.username}</span>
      </form>
    </SectionLayout>
  );
}
