import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {
  const [message, setMessage] = useState<String>("");
  const [messageReceived, setMessageReceived] = useState<String>("");
  const [allMessages, setAllMessages] = useState<String[]>([]);

  function sendMessage() {
    socket.emit("send_message", { message: message });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      setAllMessages([...allMessages, data.message]);
    });
  }, [socket]);

  return (
    <div className="App">
      {allMessages.map((message, index) => (
        <h1 key={index}>{message}</h1>
      ))}
      <input
        placeholder="Message"
        className="input-message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
}
