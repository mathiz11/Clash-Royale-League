import authService from "../services/authService";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (!authService.isAuth()) {
        await router.push("/login")
      }
    })()
  }, []);
}

export default useAuth