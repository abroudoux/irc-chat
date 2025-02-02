import { useNavigate } from "react-router-dom";

import SectionLayout from "@/components/layouts/SectionLayout";
import type { ListRoomsProps } from "@/utils/interfaces";

export default function ListRooms(props: ListRoomsProps) {
  const navigate = useNavigate();

  function handleChangeRoom(roomName: string) {
    roomName === "hello" ? navigate(`/`) : navigate(`/${roomName}`);
  }

  return (
    <SectionLayout className="p-0">
      <h2 className="font-semibold underline">Your rooms</h2>
      <ul className="my-3 flex flex-col gap-1 h-full">
        {props.rooms.map((room) => (
          <li
            key={room}
            onClick={() => handleChangeRoom(room)}
            className="p-2 hover:bg-muted-foreground/10 rounded cursor-pointer"
          >
            {room}
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
}
