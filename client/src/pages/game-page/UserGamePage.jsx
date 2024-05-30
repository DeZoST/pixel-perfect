import styles from "./UserGamePage.module.css"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import Title from "../../components/title/Title"
import {useAuth} from "../../hooks/useAuth"

const UserGamePage = () => {
    const {id, logout, role, name} = useAuth()
    console.log(id, role, name)
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
