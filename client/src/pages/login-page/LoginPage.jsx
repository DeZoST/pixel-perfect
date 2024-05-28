import styles from "./LoginPage.module.css"
import UserContent from "./components/user-login/UserContent"
import ModeratorContent from "./components/moderator-login/ModeratoContent"
import Switch from "../../components/switch/Switch"
import Title from "../../components/title/Title"
import {useState, useEffect} from "react"
import "animate.css"
import {useSearchParams} from "react-router-dom"
import {useAuthMutation} from "../../hooks/useAuthMutation"
import {useAuth} from "../../hooks/useAuth"

const LoginPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isModerator, setIsModerator] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [content, setContent] = useState()
    const {mutate: authMutation, isLoading} = useAuthMutation()
    const {login} = useAuth()

    const handleToggle = isOn => {
        setIsAnimating(true)
        setTimeout(() => {
            setIsModerator(isOn)
            setIsAnimating(false)
        }, 400)
    }
    // TODO : Add a text somewhere on the page to display the error message : searchParams.get("error")
    useEffect(() => {
        const accessToken = searchParams.get("access_token")
        if (accessToken) {
            authMutation(accessToken, {
                onSuccess: resp => {
                    setSearchParams({})
                    login(resp)
                },
            })
        }
    }, [searchParams])

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
