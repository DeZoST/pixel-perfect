import styles from "./UserContent.module.css"
import Button from "../../../../components/button/Button"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"

const UserContent = () => {
    const loginUrl =
        `https://login.live.com/oauth20_authorize.srf?client_id=${import.meta.env.VITE_CLIENT_ID}&` +
        `response_type=code&` +
        `redirect_url=${import.meta.env.VITE_SERVER_URL}/callback&` +
        `scope=XboxLive.signin%20offline_access`
    return (
        <div className={styles.buttonContainer}>
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

UserContent.propTypes = {
    className: PropTypes.string,
}

export default UserContent
