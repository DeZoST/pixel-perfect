import styles from "./GamePage.module.css"
import GameWaiting from "./components/gameWaiting/GameWaiting"

const UserGamePage = () => {
    return (
        <section className={`${styles.userGamePage}`}>
            <div className={`${styles.Container} container`}>
                <GameWaiting />
            </div>
        </section>
    )
}

export default UserGamePage
