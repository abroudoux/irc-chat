import SectionLayout from "@/components/layouts/SectionLayout";
import type { ChatProps } from "@/utils/interfaces";

export default function Chat(props: ChatProps) {
  function returnRoomName() {
    return <h2 className="text-4xl font-semibold">{props.roomName}</h2>;
  }

  if (!props.messages.length) {
    return (
      <SectionLayout className="gap-2 flex flex-col">
        {returnRoomName()}
        <h2>Start a new chat by sending a message</h2>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout className="w-full flex flex-col gap-2">
      {returnRoomName()}
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
