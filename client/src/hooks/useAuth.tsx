import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "@/lib/store";

export default function useUserConnected() {
  const navigate = useNavigate();
  const { username } = useStore();

  useEffect(() => {
    if (!username) {
      navigate("/auth");
    }
  }, [username]);
}
