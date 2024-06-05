import ButtonDisconnect from "../../../../components/button-disconnect/ButtonDisconnect"
import Title from "../../../../components/title/Title"
import WaitingMessage from "../../../../components/waiting-message/WaitingMessage"
import styles from "./GameWaiting.module.css"

const GameWaiting = game => {
    return (
        <>
            <header className={`${styles.header} animate__animated animate__fadeInRight`}>
                <ButtonDisconnect className={`${styles.button} animate__animated animate__fadeInRight`} />
            </header>
            <Title
                level={1}
                title="La partie commence bientôt"
                className={`${styles.title} animate__animated animate__fadeInDownBig`}
            />
            <div className={`${styles.divider}`}></div>
            <WaitingMessage waitingSentence={game.game.waitingSentence} />
        </>
    )
}

export default GameWaiting
