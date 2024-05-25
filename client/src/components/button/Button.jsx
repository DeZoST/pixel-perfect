import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ text, onClick, className, to }) => {

    if (to) {
        return (
            <Link className={`${styles.button} ${className}`} to={to}>
                {text}
            </Link>
        );
    }

    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    to: PropTypes.string
};

export default Button;