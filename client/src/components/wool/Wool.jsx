import PropTypes from "prop-types"
import styles from "./Wool.module.css"

const Wool = ({number, rarity, color}) => {
    return (
        <div className={`${styles.woolContainer}`}>
            <p className={`${styles.rarityText}`}>{rarity}</p>
            <img className={`${styles.wool}`} src={`/images/wool-${color}.png`} alt="wool for voting" />
        </div>
    )
}

Wool.propTypes = {
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    rarity: PropTypes.string.isRequired,
}

export default Wool
