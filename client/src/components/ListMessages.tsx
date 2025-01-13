import { Data } from "@/utils/interfaces";

export default function ListMessages({ data }: { data: Data[] }) {
  if (!data.length) {
    return (
      <div className="p-2">
        <h2>Start a new chat by sending a message</h2>
      </div>
    );
  }

  return (
    <section className="w-screen">
      <ul className="my-1">
        {data.map((data, index) => (
          <li
            key={index}
            className="p-1 flex flex-col items-start justify-start text-base"
          >
            <span className="text-sm text-muted-foreground">
              {data.username}
            </span>
            {data.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
