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

  return <Button onClick={logoutUser}>Logout</Button>;
}
