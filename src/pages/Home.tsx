import playerService from "../services/playerService";
import { useEffect } from "react";
import { ACTIONS, useStore } from "../components/Store";
import Header from "../components/Header";
import useAuth from "../components/useAuth";

const Home = () => {
  useAuth()
  const [, dispatch] = useStore();

  useEffect(() => {
    (async () => {
      try {
        const response = await playerService.getOne()

        if (response.ok) {
          dispatch({type: ACTIONS.ADD_PLAYER, payload: {user: response.data}})
        } else {
          dispatch({type: ACTIONS.SHOW_MESSAGE, payload: {status: "error", description: response.message}})
        }
      } catch (e: any) {
        dispatch({type: ACTIONS.SHOW_MESSAGE, payload: {status: "error", description: e.message}})
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header/>
      <h1>Accueil</h1>
    </div>
  )
}

export default Home
