import styles from "./UserContent.module.css"
import Button from "../button/Button"
import {Link} from "react-router-dom"

const UserContent = () => {
    const loginUrl = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=XboxLive.signin`
    return (
        <div className={`${styles.buttonContainer}`}>
            <Link to={loginUrl}>
                <Button
                    logo="/images/microsoft-logo.png"
                    text="Se connecter à Microsoft"
                    className={`${styles.button}`}
                />
            </Link>
        </div>
    )
}

export default UserContent
