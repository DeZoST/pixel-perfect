import styles from "./LoginPage.module.css"
import UserContent from "./components/user-login/UserContent"
import ModeratorContent from "./components/moderator-login/ModeratoContent"
import Switch from "../../components/switch/Switch"
import Title from "../../components/title/Title"
import {useState} from "react"
import "animate.css"

const LoginPage = () => {
    const [isModerator, setIsModerator] = useState(false)

    const handleToggle = isOn => {
        setIsModerator(isOn)
    }

    return (
        <section className={`${styles.loginPage}`}>
            <div className={`${styles.Container} container`}>
                <header className={`${styles.header} animate__animated animate__fadeInRight`}>
                    <Switch onToggle={handleToggle} className={`${styles.switch}`} />
                </header>
                <Title
                    level={1}
                    title="Connexion Pixel Perfect"
                    className={`${styles.title} animate__animated animate__fadeInDownBig`}
                />
                {isModerator ? (
                    <ModeratorContent className="animate__animated animate__fadeInUpBig" />
                ) : (
                    <UserContent className="animate__animated animate__fadeInUpBig" />
                )}
            </div>
        </section>
    )
}

export default LoginPage
