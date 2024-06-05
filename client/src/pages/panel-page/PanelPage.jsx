import {useState} from "react"
import axios from "axios"
import Button from "../../components/button/Button"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import styles from "./PanelPage.module.css"
import {useAuth} from "../../hooks/useAuth"

const PanelPage = () => {
    const [message, setMessage] = useState("")
    const {user} = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        if (!message.trim()) {
            alert("Veuillez entrer une phrase valide.")
            return
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/game/waitingSentence`,
                {sentence: message.trim()},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`,
                    },
                },
            )

            alert(response.data.message)
            setMessage("")
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
                                placeholder="Phrase d'attente"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className={`${styles.messageInput}`}
                            />
                        </div>
                        <Button type="submit" text="Confirmer" className={`${styles.buttonConfirm}`} />
                    </form>
                </div>
                <div className={`${styles.buttonsContainer}`}>
                    <div className={`${styles.gameControlContainer}`}>
                        {/* TODO: Changer le texte et la couleur du bouton quand il est cliqué pour Arreter la partie*/}
                        <Button text="Commencer la partie" className={`${styles.buttonStart}`} />
                        {/* TODO: Changer le texte et la couleur du bouton quand la partie est en pause, pour savoir si c'est actuellement en pause ou en cours */}
                        <Button text="Metttre le jeu en pause" className={`${styles.buttonPause}`} />
                    </div>
                    <Button text="Mode Casteur" className={`${styles.buttonCaster}`} />
                </div>
            </section>
            <section className={`${styles.lobbyContainer}`}>
                <h1 className={`${styles.lobbyTitle}`}>Joueurs dans le lobby</h1>
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
