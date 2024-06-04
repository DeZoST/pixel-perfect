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
                        <Wool number={1} rarity="Superpoop" color="red" />
                        <Wool number={2} rarity="Poop" color="pink" />
                        <Wool number={3} rarity="Good" color="lightgreen" />
                        <Wool number={4} rarity="Very good" color="darkgreen" />
                        <Wool number={5} rarity="Epic" color="blue" />
                        <Wool number={6} rarity="Legendary" color="yellow" />
                    </div>
                </div>
            </section>
        </section>
    )
}

export default GamePlaying
