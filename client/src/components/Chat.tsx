import SectionLayout from "@/components/layouts/SectionLayout";
import type { ChatProps } from "@/utils/interfaces";

export default function Chat(props: ChatProps) {
  if (!props.data.length) {
    return (
      <SectionLayout>
        <h2>Start a new chat by sending a message</h2>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout className="w-screen">
      <ul className="my-1">
        {props.data.map((data, index) => (
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
    </SectionLayout>
  );
}
