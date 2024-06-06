import styles from "./GamePage.module.css"
import {useEffect, useState} from "react"
import GameWaiting from "./components/gameWaiting/GameWaiting"
import GamePlaying from "./components/gamePlaying/GamePlaying"
import Logo from "../../components/logo/Logo"
import {io} from "socket.io-client"
import {useAuth} from "../../hooks/useAuth"
import PropTypes from "prop-types"

const UserGamePage = () => {
    const [game, setGame] = useState({})
    const [votes, setVotes] = useState({})
    const {user} = useAuth()

    useEffect(() => {
        const socket = io("localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${user.jwt}`,
            },
        })

        socket.on("game.listen", data => {
            console.log(data)
            setGame(data)
        })

        socket.on("vote.listen", data => {
            console.log(data)
            setVotes(data)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <section className={`${styles.userGamePage}`}>
            <Logo className={`${styles.logo}`} />
            <div className={`${styles.Container} container`}>
                <GameWaiting game={game} />
            </div>
        </section>
    )
}

UserGamePage.propTypes = {
    game: PropTypes.object,
}

export default UserGamePage
