import styles from "./UserGamePage.module.css"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import Title from "../../components/title/Title"

const UserGamePage = () => {
    return (
        <section className={`${styles.userGamePage}`}>
            <div className={`${styles.Container} container`}>
                <header className={`${styles.header} animate__animated animate__fadeInRight`}>
                    <ButtonDisconnect className={`${styles.button} animate__animated animate__fadeInRight`} />
                </header>
                <Title
                    level={1}
                    title="La partie commence bientôt"
                    className={`${styles.title} animate__animated animate__fadeInDownBig`}
                />
            </div>
        </section>
    )
}

export default UserGamePage
