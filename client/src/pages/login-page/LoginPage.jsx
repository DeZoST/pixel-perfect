import styles from "./LoginPage.module.css"
import UserContent from "./components/user-login/UserContent"
import ModeratorContent from "./components/moderator-login/ModeratoContent"
import Switch from "../../components/switch/Switch"
import Title from "../../components/title/Title"
import {useState} from "react"

const LoginPage = () => {
    const [isModerator, setIsModerator] = useState(false)

    const handleToggle = isOn => {
        setIsModerator(isOn)
    }

    return (
        <section className={`${styles.loginPage}`}>
            <div className={`${styles.Container} container`}>
                <header className={`${styles.header}`}>
                    <Switch onToggle={handleToggle} className={`${styles.switch}`} />
                </header>
                <Title level={1} title="Connexion Pixel Perfect" className={`${styles.title}`} />
                {isModerator ? <ModeratorContent /> : <UserContent />}
            </div>
        </section>
    )
}

export default LoginPage
