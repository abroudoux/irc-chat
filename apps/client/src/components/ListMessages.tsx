export default function ListMessages({ messages }: { messages: string[] }) {
  return (
    <div>
      {messages.map((message, index) => (
        <h1 key={index}>{message}</h1>
      ))}
    </div>
  );
}
