import SectionLayout from "@/components/layouts/SectionLayout";
import type { ChatProps } from "@/utils/interfaces";
import { useEffect } from "react";

export default function Chat(props: ChatProps) {
  if (!props.messages.length) {
    return (
      <SectionLayout>
        <h2>Start a new chat by sending a message</h2>
      </SectionLayout>
    );
  }

  useEffect(() => {
    console.log("Messages:", props.messages);
  });

  return (
    <SectionLayout className="w-screen">
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
