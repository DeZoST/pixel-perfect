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

        socket.on("leaderboard.listen", data => {
            console.log(data)
            setLeaderboard(data)
        })

        socket.on("players.listen", data => {
            console.log(data)
            setPlayers(data)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <section className={`${styles.userGamePage}`}>
            <Logo className={`${styles.logo}`} />
            <header className={`${styles.header}`}>
                <ButtonDisconnect className={`${styles.button}`} />
            </header>
            <div className={`${styles.Container} container`}>
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
