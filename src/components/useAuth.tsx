import authService from "../services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      if (!authService.isAuth()) {
        await navigate("/login")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useAuth