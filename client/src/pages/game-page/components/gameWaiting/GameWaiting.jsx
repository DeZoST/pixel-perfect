import ButtonDisconnect from "../../../../components/button-disconnect/ButtonDisconnect"
import Title from "../../../../components/title/Title"
import WaitingMessage from "../../../../components/waiting-message/WaitingMessage"
import {useAuth} from "../../../../hooks/useAuth"
import styles from "./GameWaiting.module.css"

const GameWaiting = game => {
    const {name} = useAuth()
    const defaultWaitingSentence = "La partie va bientôt commencer. Veuillez patienter..."
    return (
        <>
            <header className={`${styles.header}`}>
                <ButtonDisconnect className={`${styles.button}`} />
            </header>
            <Title level={1} title={`${name}, la partie commence bientôt !`} className={`${styles.title}`} />
            <div className={`${styles.divider}`}></div>
            <WaitingMessage waitingSentence={game.game.waitingSentence || defaultWaitingSentence} />
        </>
    )
}

export default GameWaiting
