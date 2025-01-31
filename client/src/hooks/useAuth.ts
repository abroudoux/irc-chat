import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "@/lib/store";
import SocketService from "@/services/socket.service";

export default function useAuth() {
  const { username } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    username ? null : navigate("/auth");
    SocketService.instance.setUserName(username);
    SocketService.instance.connect();
  });
}
