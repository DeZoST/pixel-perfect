import {useNavigate} from "react-router-dom"
import PropTypes from "prop-types"
import Button from "../button/Button"
import styles from "./ButtonDisconnect.module.css"

const ButtonDisconnect = ({className}) => {
    const navigate = useNavigate()

    const handleDisconnect = () => {
        console.log("Déconnexion")
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    return (
        <Button text="Déconnexion" onClick={handleDisconnect} className={`${className} ${styles.buttonDisconnect}`} />
    )
}

ButtonDisconnect.propTypes = {
    className: PropTypes.string,
}

export default ButtonDisconnect
