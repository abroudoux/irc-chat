import SectionLayout from "@/components/layouts/SectionLayout";
import type { ChatProps } from "@/utils/interfaces";

export default function Chat(props: ChatProps) {
  if (!props.messages.length) {
    return (
      <SectionLayout>
        <h2>Start a new chat by sending a message</h2>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout className="w-screen">
      <h2 className="text-4xl font-semibold">{props.roomName}</h2>
      <ul className="my-1">
        {props.messages.map((mess, index) => (
          <li
            key={index}
            className="p-1 flex flex-col items-start justify-start text-base"
          >
            <span className="text-sm text-muted-foreground">{mess.author}</span>
            {mess.content}
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
}
