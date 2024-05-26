import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import styles from "./Button.module.css"

const Button = ({logo, text, onClick, className, to, type}) => {
    if (to) {
        return (
            <Link className={`${styles.button} ${className}`} to={to}>
                {text}
            </Link>
        )
    }

    return (
        <button className={`${styles.button} ${className}`} onClick={onClick} type={type}>
            {logo && <img src={logo} alt="logo button" />}
            {text}
        </button>
    )
}

Button.propTypes = {
    logo: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    to: PropTypes.string,
    type: PropTypes.string,
}

export default Button
