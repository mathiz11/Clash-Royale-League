import { get, getDatabase, ref } from "@firebase/database";

function getAllByPlayerId(): Promise<void> {
  const db = getDatabase()

  return get(ref(db, "/leagues")).then(snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(league => {
        console.log(league)
      })
    }
    // else {
    //
    // }
  }).catch()
}

const leagueService = {
  getAllByPlayerId
}

export default leagueService