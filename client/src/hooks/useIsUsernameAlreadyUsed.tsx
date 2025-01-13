import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import type { useIsUsernameAlreadyUsedProps } from "@/utils/interfaces";
import { useEffect } from "react";

export default function useIsUsernameAlreadyUsed(
  props: useIsUsernameAlreadyUsedProps
) {
  const navigate = useNavigate();
  const socket: Socket<any> = io(props.socketUrl);
  useEffect(() => {
    if (!props.username) return;

    socket.emit(
      "join_room",
      props.username,
      (response: { success: boolean; message?: string }) => {
        if (!response.success) {
          alert(response.message || "Username already taken");
          navigate("/auth");
        }
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [props.username, navigate]);
}
