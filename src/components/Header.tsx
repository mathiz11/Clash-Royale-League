import { Box, Icon, IconButton } from "@chakra-ui/react";
import "../styles/Header.css"
import { FaHome } from "react-icons/fa";
import authService from "../services/authService";
import { ACTIONS, useStore } from "./Store";
import { Link, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const [, dispatch] = useStore();
  const navigate = useNavigate()

  async function logOut() {
    await authService.logOut()
    dispatch({type: ACTIONS.LOG_OUT})
    await navigate("/login")
  }

  return (
    <header>
      <Box display="flex" alignItems="center" py={2} px={2} bgColor={"gray.200"}>
        <Link to="/" className="homeLink">
          <Icon as={FaHome} w={5} h={5}/>
        </Link>
        <Link to="/leagues">Championnats</Link>
        <Link to="/profile">Profil</Link>
        <IconButton ml="auto" onClick={logOut} aria-label="Déconnexion"
                    icon={<FiLogOut/>} size="lg" variant="ghost">Déconnexion</IconButton>
      </Box>
    </header>
  )
}

export default Header