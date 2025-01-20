import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

export default function BtnLogoutUser() {
  const navigate = useNavigate();
  const { setUsername } = useStore();

  function logoutUser() {
    setUsername("");
    navigate("/auth");
  }

  return (
    <div className="h-full flex flex-col items-center justify-end">
      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
}
