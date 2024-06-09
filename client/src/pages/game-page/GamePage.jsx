import styles from "./GamePage.module.css"
import {useEffect, useState} from "react"
import GameWaiting from "./components/gameWaiting/GameWaiting"
import GamePlaying from "./components/gamePlaying/GamePlaying"
import GameScoreboard from "./components/gameScoreboard/GameScoreboard"
import Logo from "../../components/logo/Logo"
import {io} from "socket.io-client"
import {useAuth} from "../../hooks/useAuth"
import PropTypes from "prop-types"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"

const UserGamePage = () => {
    const [game, setGame] = useState({})
    const [votes, setVotes] = useState({})
    const [players, setPlayers] = useState([])
    const [leaderboard, setLeaderboard] = useState([])
    const {user} = useAuth()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SERVER_URL, {
            extraHeaders: {
                Authorization: `Bearer ${user.jwt}`,
            },
        })

        socket.on("game.listen", data => {
            setGame(data)
        })

        socket.on("vote.listen", data => {
            setVotes(data)
        })

        socket.on("leaderboard.listen", data => {
            setLeaderboard(data)
        })

        socket.on("players.listen", data => {
            setPlayers(data)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    // prevent flickering while waiting for socket to connect
    if (!game.id) {
        return null
    }

    return (
        <section className={`${styles.userGamePage}`}>
            <Logo />

            <div className={`${styles.Container} container`}>
                <header className={`${styles.header}`}>
                    <ButtonDisconnect className={`${styles.button}`} />
                </header>
                {game.isFinished ? (
                    <GameScoreboard game={game} leaderboard={leaderboard} />
                ) : game.isStarted ? (
                    <GamePlaying
                        game={game}
                        votes={votes}
                        players={players}
                        currentTeam={game.currentTeam}
                        isPaused={game.isPaused}
                    />
                ) : (
                    <GameWaiting game={game} />
                )}
            </div>
        </section>
    )
}

UserGamePage.propTypes = {
    game: PropTypes.object,
}

export default UserGamePage
