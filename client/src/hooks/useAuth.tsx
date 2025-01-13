import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "@/lib/store";

export default function useAuth() {
  const navigate = useNavigate();
  const { username } = useStore();

  useEffect(() => {
    if (username === "") {
      navigate("/auth");
    }
  }, [username, navigate]);
}
