import { get, getDatabase, ref } from "@firebase/database";
import { getAuth } from "firebase/auth";
import { ReqResponse } from "../utils/response";

export type Player = {
  id: string,
  email: string,
  username: string,
  leagues: string[]
}

async function getOne(): Promise<ReqResponse<Player>> {
  const auth = getAuth()
  const db = getDatabase()

  if (auth.currentUser?.uid) {
    try {
      const snapshot = await get(ref(db, `/players/${auth.currentUser?.uid}`))
      if (snapshot.exists()) {
        return {ok: true, data: snapshot.val()}
      } else {
        return {ok: false, message: "Le joueur n'existe pas."}
      }
    } catch (e: any) {
      return {ok: false, message: e.message};
    }
  } else {
    return {ok: false, message: "L'utilisateur est introuvable."};
  }
}

const playerService = {
  getOne
}

export default playerService