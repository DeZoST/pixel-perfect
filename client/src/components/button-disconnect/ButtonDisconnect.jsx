import PropTypes from "prop-types"
import Button from "../button/Button"
import styles from "./ButtonDisconnect.module.css"
import {useAuth} from "../../hooks/useAuth"
import {useNavigate} from "react-router-dom"

const ButtonDisconnect = ({className}) => {
    const {logout, role} = useAuth()
    const navigate = useNavigate()
    return (
        <>
            {role === "moderator" &&
                !window.location.pathname.includes("/panel") &&
                !window.location.pathname.includes("/game") && (
                    <Button
                        text="Panel"
                        onClick={() => navigate("/panel")}
                        className={`${className} ${styles.buttonDisconnect}`}
                    />
                )}
            <Button text="Déconnexion" onClick={() => logout()} className={`${className} ${styles.buttonDisconnect}`} />
        </>
    )
}

ButtonDisconnect.propTypes = {
    className: PropTypes.string,
}

export default ButtonDisconnect
