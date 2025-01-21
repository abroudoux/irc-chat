import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionLayout from "@/components/layouts/SectionLayout";
import type { InputSendMessageProps } from "@/utils/interfaces";

export default function InputSendMessage(props: InputSendMessageProps) {
  const [message, setMessage] = useState<string>("");
  const [tooltip, setTooltip] = useState<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: string[] = [
    "/nick --Change your username",
    "/list --List all available rooms",
    "/create --Create a new room",
    "/delete --Delete a room",
    "/join --Join a room",
    "/quit --Leave a room",
    "/users --List all users in a room",
    "/msg --Send a private message",
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);

    if (e.target.value.startsWith("/")) {
      setTooltip(commands);
    }
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (message.length === 0) return;

    const username: string = props.username;
    const roomName: string = props.roomName;

    if (message.startsWith("/")) {
      handleCommand(message.slice(1), username);
    } else {
      props.socket.sendMessage(roomName, username, message);
    }

    setMessage("");
    setTooltip(null);
  }

  function handleCommand(command: string, username: string) {
    switch (command.toLowerCase()) {
      case "help":
        console.log("Displaying help information...");
        break;
      case "clear":
        console.log("Clearing messages...");
        break;
      default:
        console.log(`Unknown command: ${command}`);
        break;
    }
  }

  return (
    <SectionLayout>
      <form
        className="flex w-full items-center space-x-2 fixed bottom-16 justify-start"
        onSubmit={sendMessage}
      >
        {tooltip && (
          <ul className="absolute bg-background shadow text-foreground p-2 rounded-md mb-64 ml-2 w-4xl">
            {tooltip.map((command, index) => (
              <li key={index}>{command}</li>
            ))}
          </ul>
        )}
        <Input
          ref={inputRef}
          type="text"
          className="max-w-screen-sm"
          placeholder="Your message"
          value={message}
          onChange={handleInput}
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
