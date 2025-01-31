import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "@/lib/store";
import { connectUser } from "@/services/auth.service";

export default function useAuth() {
  const navigate = useNavigate();
  const { username } = useStore();

  async function createConnection() {
    const response = await connectUser(username);
    if (response.error) {
      console.error(response.errorMessage);
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (username) {
      createConnection().then((connected) => {
        if (connected) {
          navigate("/");
        }
      });
    }
  }, [username, navigate]);
}
