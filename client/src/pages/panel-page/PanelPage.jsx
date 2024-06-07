import {useEffect, useState} from "react"
import axios from "axios"
import Button from "../../components/button/Button"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import styles from "./PanelPage.module.css"
import {useAuth} from "../../hooks/useAuth"
import {io} from "socket.io-client"
import {useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faXmark, faCheck} from "@fortawesome/free-solid-svg-icons"

const PanelPage = () => {
    const [newWaitingSentence, setNewWaitingSentence] = useState("")
    const [game, setGame] = useState({})
    const [players, setPlayers] = useState([])
    const {user} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const socket = io("localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${user.jwt}`,
            },
        })

        socket.on("players.listen", data => {
            console.log(data)
            setPlayers(data)
        })

        socket.on("game.listen", data => {
            console.log(data)
            setGame(data)
        })

        return () => {
            socket.disconnect()
        }
    }, [user.jwt])

    const handleSubmit = async e => {
        e.preventDefault()
        if (!newWaitingSentence.trim()) {
            alert("Veuillez entrer une phrase valide.")
            return
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/game/waitingSentence`,
                {sentence: newWaitingSentence.trim()},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`,
                    },
                },
            )
            setNewWaitingSentence("")
        } catch (error) {
            console.error("Error updating waiting sentence:", error.response || error.message)
            alert(
                `Erreur lors de la mise à jour de la phrase d'attente: ${
                    error.response ? error.response.data.message : error.message
                }`,
            )
        }
    }

    const togglePause = async () => {
        if (!game.isStarted) {
            alert("La partie n'a pas encore commencé.")
            return
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/game/${game.isPaused ? "resume" : "pause"}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`,
                    },
                },
            )
        } catch (error) {
            console.error(`Error ${game.isPaused ? "resuming" : "pausing"} game:`, error.response || error.message)
            alert(
                `Erreur lors de ${game.isPaused ? "la reprise" : "la mise en pause"} du jeu: ${
                    error.response ? error.response.data.message : error.message
                }`,
            )
        }
    }

    const startGame = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/game/start`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`,
                    },
                },
            )
        } catch (error) {
            console.error("Error starting game:", error.response || error.message)
            alert(`Erreur lors du démarrage du jeu: ${error.response ? error.response.data.message : error.message}`)
        }
    }

    const groupPlayersByTeam = players => {
        return players.reduce((groups, player) => {
            if (!groups[player.teamName]) {
                groups[player.teamName] = []
            }
            groups[player.teamName].push(player)
            return groups
        }, {})
    }

    const sortPlayersByStatus = players => {
        return players.sort((a, b) => (a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1))
    }

    const groupedAndSortedPlayers = () => {
        const groupedPlayers = groupPlayersByTeam(players)
        const sortedGroups = Object.keys(groupedPlayers).map(team => ({
            teamName: team,
            players: sortPlayersByStatus(groupedPlayers[team]),
        }))
        return sortedGroups
    }

    return (
        <section className={`${styles.panelPage} container`}>
            <section className={`${styles.panelContainer}`}>
                <div className={`${styles.panel}`}>
                    <header className={`${styles.header}`}>
                        <ButtonDisconnect className={`${styles.buttonDisconnect}`} />
                    </header>
                    <form onSubmit={handleSubmit} className={`${styles.panelMessageContainer}`}>
                        <div className={`${styles.messageContainer}`}>
                            <h2 className={`${styles.messageTitle}`}>Phrase d&apos;attente</h2>
                            <input
                                type="text"
                                maxLength="100"
                                placeholder={game.waitingSentence || "Phrase d'attente"}
                                value={newWaitingSentence}
                                onChange={e => setNewWaitingSentence(e.target.value)}
                                className={`${styles.messageInput}`}
                            />
                        </div>
                        <Button type="submit" text="Confirmer" className={`${styles.buttonConfirm}`} />
                    </form>
                </div>
                <div className={`${styles.buttonsContainer}`}>
                    <Button
                        text="Commencer une nouvelle partie"
                        onClick={() => confirm("Voulez vous vraiment commencer une nouvelle partie ?") && startGame()}
                        className={`${styles.buttonStart}`}
                        disabled={game.isStarted}
                    />
                    <Button
                        text={game.isPaused ? "Relancer la partie" : "Mettre le jeu en pause"}
                        onClick={togglePause}
                        className={`${styles.buttonPause}`}
                        disabled={!game.isStarted}
                    />
                    <Button
                        text="Upload une vidéo"
                        onClick={() => navigate("/upload")}
                        className={`${styles.buttonPause}`}
                    />

                    <Button
                        text="Mode Casteur"
                        onClick={() => navigate("/game")}
                        className={`${styles.buttonCaster}`}
                    />
                </div>
            </section>
            <section className={`${styles.lobbyContainer}`}>
                <h1 className={`${styles.lobbyTitle}`}>Joueurs du lobby</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Pseudo minecraft</th>
                                <th scope="col">Equipe</th>
                                <th scope="col">Connecté</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedAndSortedPlayers().map(group =>
                                group.players.map(player => (
                                    <tr key={player.id}>
                                        <td>{player.name}</td>
                                        <td>{group.teamName}</td>
                                        <td>
                                            {player.isOnline ? (
                                                <FontAwesomeIcon icon={faCheck} style={{color: "green"}} />
                                            ) : (
                                                <FontAwesomeIcon icon={faXmark} style={{color: "red"}} />
                                            )}
                                        </td>
                                    </tr>
                                )),
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
    )
}

export default PanelPage
