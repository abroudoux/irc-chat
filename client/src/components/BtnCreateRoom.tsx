import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoomService } from "@/services/room.services";

const roomService = new RoomService();

export default function BtnCreateRoom() {
  const [roomName, setRoomName] = useState<string>("");

  async function handleCreateRoom() {
    if (roomName.length === 0) return;
    const response = await roomService.createRoom(roomName);
    console.log(response);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new room</DialogTitle>
          <DialogDescription>
            Rooms are where your team communicates. They’re best when organized
            around a topic — #leads, for example.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={roomName}
              className="col-span-3"
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateRoom}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
