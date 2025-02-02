import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "@/lib/store";
import SocketService from "@/services/socket.service";
import AuthService from "@/services/auth.service";

export default function useAuth() {
  const { username } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      AuthService.instance.connectUser(username);
      SocketService.instance.setUserName(username);
      SocketService.instance.connect();
    } else {
      navigate("/auth");
    }
  }, [username, navigate]);
}
