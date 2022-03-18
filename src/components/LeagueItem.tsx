import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { RankingItem } from "../services/leagueService";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";

type Props = {
  id?: string
  name: string;
  isInProgress: boolean
  ranking: RankingItem[]
}

const LeagueItem = ({id, name, isInProgress, ranking}: Props) => {
  return (
    <Box py={5} bgColor={isInProgress ? "white" : "red.100"} display="flex" flexDirection="column"
         borderBottomWidth='1px'>
      <Box display="flex" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">{name}</Text>
      </Box>
      <Table my={5} size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Joueur</Th>
            <Th>MJ</Th>
            <Th>C</Th>
            <Th>PTS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ranking.map(item => (
            <Tr key={`league-item-${id}-${name}-${item.id}`}>
              <Th>{item.position}</Th>
              <Th>{item.username}</Th>
              <Th>{item.gamesPlayed}</Th>
              <Th>{`${item.wonCrowns} : ${item.lostCrowns}`}</Th>
              <Th>{item.points}</Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box display="flex" alignItems="center">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            Ajouter
          </MenuButton>
          <MenuList>
            <MenuItem>Joueur</MenuItem>
            <MenuItem>Résultat</MenuItem>
          </MenuList>
        </Menu>
        <IconButton ml="auto" colorScheme="red" aria-label='Supprimer une ligue' icon={<DeleteIcon/>}/>
      </Box>
    </Box>
  )
}

export default LeagueItem