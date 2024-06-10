import PropTypes from "prop-types"
import Button from "../button/Button"
import styles from "./ButtonDisconnect.module.css"
import {useAuth} from "../../hooks/useAuth"
import {useNavigate} from "react-router-dom"

const ButtonDisconnect = () => {
    const {logout, role} = useAuth()
    const navigate = useNavigate()
    return (
        <>
            {role === "moderator" && !window.location.pathname.includes("/panel") && (
                <Button
                    text="Panel"
                    onClick={() => navigate("/panel")}
                    className={`${styles.buttonPanel} ${styles.buttonDisconnect}`}
                />
            )}
            <Button text="Déconnexion" onClick={() => logout()} className={styles.buttonDisconnect} />
        </>
    )
}

ButtonDisconnect.propTypes = {
    className: PropTypes.string,
}

export default ButtonDisconnect
