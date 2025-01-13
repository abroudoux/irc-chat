import SectionLayout from "@/components/layouts/SectionLayout";
import type { ListRoomsProps } from "@/utils/interfaces";

export default function ListChannels(props: ListRoomsProps) {
  return (
    <SectionLayout>
      <ul>
        {props.rooms.map((room: string) => (
          <li key={room}>{room}</li>
        ))}
      </ul>
    </SectionLayout>
  );
}
