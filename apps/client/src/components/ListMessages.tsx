export default function ListMessages({ messages }: { messages: string[] }) {
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
