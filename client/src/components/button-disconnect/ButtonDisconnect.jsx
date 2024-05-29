import PropTypes from "prop-types"
import Button from "../button/Button"
import styles from "./ButtonDisconnect.module.css"
import {useAuth} from "../../hooks/useAuth"

const ButtonDisconnect = ({className}) => {
    const {logout} = useAuth()
    return <Button text="Déconnexion" onClick={() => logout()} className={`${className} ${styles.buttonDisconnect}`} />
}

ButtonDisconnect.propTypes = {
    className: PropTypes.string,
}

export default ButtonDisconnect
