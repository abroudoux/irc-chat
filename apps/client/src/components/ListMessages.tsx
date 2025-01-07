export default function ListMessages({ messages }: { messages: string[] }) {
  if (!messages.length) {
    return (
      <div className="p-2">
        <h2>Start a new chat by sending a message</h2>
      </div>
    );
  }

  return (
    <section className="w-screen">
      <ul className="my-1">
        {messages.map((message, index) => (
          <li key={index} className="p-1">
            {message}
          </li>
        ))}
      </ul>
    </section>
  );
}
