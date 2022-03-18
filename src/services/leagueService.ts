import { get, getDatabase, ref } from "@firebase/database";
import { ReqResponse } from "../utils/response";
import { getAuth } from "firebase/auth";

export type League = {
  id?: string
  name: string
  players: string[]
  startDate: Date
  endDate?: Date
  ranking: RankingItem[]
}

export type RankingItem = {
  id?: string
  username: string
  position: number
  gamesPlayed: number
  wonCrowns: number
  lostCrowns: number
  points: number
}

function getAllByPlayerId(): Promise<ReqResponse<League[]>> {
  const playerId = getAuth().currentUser?.uid

  if (!playerId) {
    return Promise.resolve({ok: false, message: "L'utilisateur est introuvable."})
  }

  const db = getDatabase()

  return get(ref(db, "/leagues")).then(snapshot => {
    if (snapshot.exists()) {
      const leagues: League[] = []

      snapshot.forEach(league => {
        if (league.exists() && league.val().players.includes(playerId)) {
          const ranking: RankingItem[] = []
          for (const [key, value] of Object.entries(league.val().ranking)) {
            ranking.push({
              id: key,
              ...value as RankingItem,
            })
          }

          const leagueToAdd: League = league.val()
          leagueToAdd.ranking = ranking

          if (league.key) {
            leagueToAdd.id = league.key
          }

          leagues.push(leagueToAdd)
        }
      })

      return {ok: true, data: leagues}
    } else {
      return {ok: false, message: "Il n'existe aucun championnat."}
    }
  }).catch((e: any) => ({ok: false, message: e.message}))
}

const leagueService = {
  getAllByPlayerId
}

export default leagueService