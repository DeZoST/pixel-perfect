import PropTypes from "prop-types"
import styles from "./Title.module.css"

const Title = ({level, title, subtitle, className}) => {
    const Tag = `h${level}`
    return (
        <div className={`${styles.title} ${className}`}>
            <Tag>{title}</Tag>
            {subtitle && <h2>{subtitle}</h2>}
            <div className={styles.divider}></div>
        </div>
    )
}

Title.propTypes = {
    level: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    className: PropTypes.string,
}

export default Title
