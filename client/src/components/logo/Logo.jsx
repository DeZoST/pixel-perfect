import PropTypes from 'prop-types';
import styles from './Logo.module.css';

const Logo = ({ className }) => {
    return (
        <img
            src="/images/logo-cite.png"
            alt="Logo de la Cité des Pixels"
            className={`${className} ${styles.logo}`}
        />
    );
};

Logo.propTypes = {
    className: PropTypes.string.isRequired,
};

export default Logo;