import styles from "./GamePage.module.css"
import GameWaiting from "./components/gameWaiting/GameWaiting"
import GamePlaying from "./components/gamePlaying/GamePlaying"
import Logo from "../../components/logo/Logo"

const UserGamePage = () => {
    return (
        <section className={`${styles.userGamePage}`}>
            <Logo className={`${styles.logo}`} />
            <div className={`${styles.Container} container`}>
                <GameWaiting />
            </div>
        </section>
    )
}

export default UserGamePage
