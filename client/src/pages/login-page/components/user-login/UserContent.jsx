import styles from "./UserContent.module.css"
import Button from "../../../../components/button/Button"

const UserContent = () => {
    const loginUrl = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=XboxLive.signin`

    const handleLoginClick = () => {
        window.open(loginUrl, "Microsoft Login", "width=600,height=800")
    }

    return (
        <div className={`${styles.buttonContainer}`}>
            <Button
                logo="/images/microsoft-logo.png"
                text="Se connecter à Microsoft"
                className={`${styles.button}`}
                onClick={handleLoginClick}
            />
        </div>
    )
}

export default UserContent
