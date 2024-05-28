import {useNavigate} from "react-router-dom"
import PropTypes from "prop-types"
import Button from "../button/Button" // Assurez-vous que le chemin vers Button est correct

const ButtonDisconnect = ({className}) => {
    const navigate = useNavigate()

    const handleDisconnect = () => {
        console.log("Déconnexion")
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    return <Button text="Déconnexion" onClick={handleDisconnect} className={className} />
}

ButtonDisconnect.propTypes = {
    className: PropTypes.string,
}

export default ButtonDisconnect
