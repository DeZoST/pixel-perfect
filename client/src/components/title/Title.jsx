import PropTypes from 'prop-types';
import styles from './Title.module.css';

const Title = ({ level, title, subtitle }) => {
    const Tag = `h${level}`;
    return (
    <div className={styles.title}>
        <Tag>{title}</Tag>
        {subtitle && <h2>{subtitle}</h2>}
        <div className={styles.divider}></div>
    </div>
    );
}

Title.propTypes = {
    level: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  };

export default Title;