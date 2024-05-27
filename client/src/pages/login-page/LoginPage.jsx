import styles from "./LoginPage.module.css"
import UserContent from "./components/user-login/UserContent"
import ModeratorContent from "./components/moderator-login/ModeratoContent"
import Switch from "../../components/switch/Switch"
import Title from "../../components/title/Title"
import {useState, useEffect} from "react"
import "animate.css"

const LoginPage = () => {
    const [isModerator, setIsModerator] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [content, setContent] = useState()

    const handleToggle = isOn => {
        setIsAnimating(true)
        setTimeout(() => {
            setIsModerator(isOn)
            setIsAnimating(false)
        }, 400)
    }

    useEffect(() => {
        if (!isAnimating) {
            setContent(
                isModerator ? (
                    <ModeratorContent className="animate__animated animate__fadeInUpBig" />
                ) : (
                    <UserContent className="animate__animated animate__fadeInUpBig" />
                ),
            )
        }
    }, [isAnimating, isModerator])

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
                <div
                    className={`${styles.contentContainer} ${isAnimating ? "animate__animated animate__fadeOutDownBig" : ""}`}
                >
                    {content}
                </div>
            </div>
        </section>
    )
}

export default LoginPage
