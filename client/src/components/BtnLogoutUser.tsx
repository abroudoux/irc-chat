import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";
import SocketService from "@/services/socket.service";

export default function BtnLogoutUser() {
  const navigate = useNavigate();
  const { setUsername } = useStore();

  function logoutUser() {
    SocketService.instance.disconnect();
    setUsername("");
    navigate("/auth");
  }

  return (
    <div className="h-auto flex flex-col items-center justify-end">
      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
}
