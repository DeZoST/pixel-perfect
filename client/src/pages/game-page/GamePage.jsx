import styles from "./GamePage.module.css"
import {useEffect, useState} from "react"
import GameWaiting from "./components/gameWaiting/GameWaiting"
import GamePlaying from "./components/gamePlaying/GamePlaying"
import GameScoreboard from "./components/gameScoreboard/GameScoreboard"
import Logo from "../../components/logo/Logo"
import {io} from "socket.io-client"
import {useAuth} from "../../hooks/useAuth"
import PropTypes from "prop-types"

const UserGamePage = () => {
    const [game, setGame] = useState({})
    const [votes, setVotes] = useState({})
    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const {user} = useAuth()

    const [isStarted, setIsStarted] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [currentTeam, setCurrentTeam] = useState({})

    useEffect(() => {
        const socket = io("localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${user.jwt}`,
            },
        })

        socket.on("game.listen", data => {
            console.log(data)
            setGame(data)
            setIsStarted(data.isStarted === 1)
            setIsPaused(data.isPaused === 1)
            setIsFinished(data.isFinished === 1)

            if (data.currentTeamId) {
                const team = teams.find(team => team.ID === data.currentTeamId)
                if (team) {
                    setCurrentTeam(team)
                }
            }
        })

        socket.on("vote.listen", data => {
            console.log(data)
            setVotes(data)
        })

        socket.on("players.listen", data => {
            console.log(data)
            setPlayers(data)
        })

        return () => {
            socket.disconnect()
        }
    }, [teams, user.jwt])

    useEffect(() => {
        async function fetchTeams() {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/teams`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
            const teamData = await response.json()
            setTeams(teamData)
        }
        fetchTeams()
    }, [user.jwt])

    return (
        <section className={`${styles.userGamePage}`}>
            <Logo className={`${styles.logo}`} />
            <div className={`${styles.Container} container`}>
                {isFinished ? (
                    <GameScoreboard game={game} />
                ) : isStarted ? (
                    <GamePlaying
                        game={game}
                        votes={votes}
                        players={players}
                        currentTeam={currentTeam}
                        isPaused={isPaused}
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
