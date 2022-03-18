import Header from "../components/Header";
import { useStore } from "../components/Store";
import { Container, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";

const Profile = () => {
  const [state] = useStore()

  return (
    <div>
      <Header/>
      <Container pt={10}>
        <Heading as="h1">Profil</Heading>
        <FormControl pt={5}>
          <FormLabel htmlFor="username">Nom d'utilisateur</FormLabel>
          <Input
            id="username"
            type="text"
            value={state.player?.username}
            disabled
          />
        </FormControl>
        <FormControl pt={5}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="text"
            value={state.player?.email}
            disabled
          />
        </FormControl>
      </Container>
    </div>
  )
}

export default Profile