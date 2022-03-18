import { NextPage } from "next";
import Header from "../components/Header";
import { useStore } from "../components/Store";
import Head from 'next/head'

const Profile: NextPage = () => {
  const [state] = useStore()
  console.log(state)

  return (
    <div>
      <Head>
        <title>Profil</title>
        <meta name="description" content="Bienvenue la page de profil"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Header/>

      <main>
        <h1>Championnats</h1>

      </main>
    </div>
  )
}

export default Profile