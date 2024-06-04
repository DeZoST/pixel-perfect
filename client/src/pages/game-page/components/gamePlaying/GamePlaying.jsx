import Title from "../../../../components/title/Title"
import Wool from "../../../../components/wool/Wool"
import styles from "./GamePlaying.module.css"

const GamePlaying = () => {
    return (
        <section className={`${styles.gamePlayingPage}`}>
            <section className={`${styles.gamePlayingContainer} container`}>
                <header className={`${styles.headerContainer}`}>
                    <Title level={1} title="Votez la qualité de la vidéo" className={styles.title} />
                    <div className={`${styles.timerContainer}`}>
                        <div className={`${styles.timerLine}`}></div>
                        <h2 className={`${styles.timerText}`}>X secondes restantes</h2>
                    </div>
                </header>
                <div className={`${styles.mainGameContainer}`}>
                    <div className={`${styles.videoContainer}`}>
                        <h2 className={`${styles.teamName}`}>Team Daniell</h2>
                        <video className={`${styles.video}`} controls></video>
                    </div>
                    <div className={`${styles.woolsContainer}`}>
                        <Wool color="red" />
                        <Wool color="pink" />
                        <Wool color="lightgreen" />
                        <Wool color="darkgreen" />
                        <Wool color="blue" />
                        <Wool color="yellow" />
                    </div>
                </div>
            </section>
        </section>
    )
}

export default GamePlaying
