import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionLayout from "@/components/layouts/SectionLayout";
import useStore from "@/lib/store";
import type { InputSendMessageProps } from "@/utils/interfaces";
import CommandsService from "@/services/commands.service";

export default function InputSendMessage(props: InputSendMessageProps) {
  const [message, setMessage] = useState<string>("");
  const [tooltip, setTooltip] = useState<string[] | null>(null);
  const { setUsername } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
      const command: string = message.split(" ")[0].slice(1);
      const argument: string = message.split(" ")[1];
      handleCommand(command, argument, username);
    } else {
      props.socket.sendMessage(username, roomName, message);
    }

    setMessage("");
    setTooltip(null);
  }

  function handleCommand(command: string, argument: string, username: string) {
    console.log(`Command: ${command}, Argument: ${argument}`);
    switch (command.toLowerCase()) {
      case "nick":
        CommandsService.instance.handleChangeUsername(
          username,
          argument,
          props.roomName
        );
        setUsername(argument);
        break;
      case "list":
        CommandsService.instance.handleGetRooms(props.roomName);
        break;
      case "create":
        CommandsService.instance.handleCreateRoom(props.roomName, argument);
        break;
      case "delete":
        CommandsService.instance.handleDeleteRoom(props.roomName, argument);
        break;
      case "join":
        navigate(`/${argument}`);
        break;
      case "quit":
        console.log("quit command");
        break;
      case "users":
        console.log("users command");
        break;
      case "msg":
        console.log("msg command");
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
