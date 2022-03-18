import Header from "../components/Header";
import { Container, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import leagueService, { League } from "../services/leagueService";
import { ACTIONS, useStore } from "../components/Store";
import LeagueItem from "../components/LeagueItem";
import { AddIcon } from "@chakra-ui/icons";

const Leagues = () => {
  const [, dispatch] = useStore()
  const [leagues, setLeagues] = useState<League[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await leagueService.getAllByPlayerId()

        if (response.ok && response.data) {
          setLeagues(response.data)
        } else {
          dispatch({type: ACTIONS.SHOW_MESSAGE, payload: {status: "error", description: response.message}})
        }
      } catch (e: any) {
        dispatch({type: ACTIONS.SHOW_MESSAGE, payload: {status: "error", description: e.message}})
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Header/>
      <Container pt={10} maxW='container.lg'>
        <Flex alignItems="center" borderBottomWidth="1px" pb={5}>
          <Heading as="h1">Championnats</Heading>
          <IconButton ml="auto" aria-label='Ajouter une ligue' icon={<AddIcon/>}/>
        </Flex>
        {leagues.map(league => (
          <LeagueItem key={`league-item-${league.id}`} id={league.id} name={league.name} isInProgress={!league.endDate}
                      ranking={league.ranking}/>
        ))}
      </Container>
    </div>
  )
}

export default Leagues