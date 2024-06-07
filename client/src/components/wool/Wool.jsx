import PropTypes from "prop-types"
import styles from "./Wool.module.css"
import {useState} from "react"

const Wool = ({number, rarity, color, onClick, selected, dimmed, votes}) => {
    const [isHovered, setIsHovered] = useState(false)

    const woolColors = {
        red: "#5C1513", // Superpoop
        pink: "#8B4D60", // Poop
        lightgreen: "#3C660D", // Good
        darkgreen: "#303E10", // Very good
        blue: "#2C2D7C", // Epic
        yellow: "#DAAC1F", // Legendary
    }

    const dropShadowStyle = {
        filter: isHovered ? `drop-shadow(0 0 10px ${woolColors[color]})` : "",
    }

    return (
        <div
            className={`${styles.woolContainer}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p className={`${styles.rarityText}`}>{rarity}</p>
            <img
                className={`${styles.wool} ${selected ? styles.selected : ""} ${dimmed ? styles.dimmed : ""}`}
                src={`/images/wool-${color}.png`}
                alt="wool for voting"
                style={dropShadowStyle}
            />
            {votes !== undefined && <p className={`${styles.votesCount}`}>{votes}</p>}
        </div>
    )
}

Wool.propTypes = {
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    rarity: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    dimmed: PropTypes.bool,
    votes: PropTypes.number,
}

export default Wool
