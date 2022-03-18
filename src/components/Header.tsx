import Link from "next/link"
import { Button, Icon } from "@chakra-ui/react";
import styles from "../styles/Header.module.css"
import { FaHome } from "react-icons/fa";
import authService from "../services/authService";
import { ACTIONS, useStore } from "./Store";
import { useRouter } from "next/router";

const Header = () => {
  const [, dispatch] = useStore();
  const router = useRouter();

  async function logOut() {
    await authService.logOut()
    dispatch({type: ACTIONS.LOG_OUT})
    await router.push("/login")
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.homeLink}>
          <Icon as={FaHome} w={5} h={5}/>
        </a>
      </Link>
      <Link href="/leagues">
        <a className={styles.link}>Championnats</a>
      </Link>
      <Link href="/profile">
        <a className={styles.link}>Profil</a>
      </Link>
      <Button colorScheme="red" ml="auto" onClick={logOut}>Déconnexion</Button>
    </header>
  )
}

export default Header