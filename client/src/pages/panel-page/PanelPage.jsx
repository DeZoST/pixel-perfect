import {useEffect, useState} from "react"
import axios from "axios"
import Button from "../../components/button/Button"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import styles from "./PanelPage.module.css"
import {useAuth} from "../../hooks/useAuth"
import {io} from "socket.io-client"
import {useNavigate} from "react-router-dom"

const PanelPage = () => {
    const [newWaitingSentence, setNewWaitingSentence] = useState("")
    const [game, setGame] = useState({})
    const {user} = useAuth()
    const navigate = useNavigate()

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
    }, [])

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

            alert(response.data.message)
            setNewWaitingSentence("")
        } catch (error) {
            console.error("Error updating waiting sentence:", error.response || error.message)
            alert(
                `Erreur lors de la mise à jour de la phrase d'attente: ${error.response ? error.response.data.message : error.message}`,
            )
        }
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
                    <div className={`${styles.gameControlContainer}`}>
                        <Button text="Commencer une nouvelle partie" className={`${styles.buttonStart}`} />
                        {/* TODO: Changer le texte et la couleur du bouton quand la partie est en pause, pour savoir si c'est actuellement en pause ou en cours */}
                        <Button text="Metttre le jeu en pause" className={`${styles.buttonPause}`} />
                        <Button
                            text="Upload une vidéo"
                            onClick={() => navigate("/upload")}
                            className={`${styles.buttonPause}`}
                        />
                    </div>
                    <Button
                        text="Mode Casteur"
                        onClick={() => navigate("/game")}
                        className={`${styles.buttonCaster}`}
                    />
                </div>
            </section>
            <section className={`${styles.lobbyContainer}`}>
                <h1 className={`${styles.lobbyTitle}`}>Classement du lobby</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Numéro</th>
                                <th scope="col">Equipes</th>
                                <th scope="col">Classement</th>
                                <th scope="col">Points</th>
                                <th scope="col">Laines</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </section>
        </section>
    )
}

export default PanelPage
