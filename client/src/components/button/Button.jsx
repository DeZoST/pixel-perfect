import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import styles from "./Button.module.css"

const Button = ({logo, text, onClick, className, to, type, inputRef}) => {
    const handleClick = () => {
        if (inputRef) {
            inputRef.current.click()
        } else if (onClick) {
            onClick()
        }
    }

    if (to) {
        return (
            <Link className={`${styles.button} ${className}`} to={to}>
                {text}
            </Link>
        )
    }

    return (
        <button className={`${styles.button} ${className}`} onClick={handleClick} type={type}>
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
    inputRef: PropTypes.object,
}

export default Button
