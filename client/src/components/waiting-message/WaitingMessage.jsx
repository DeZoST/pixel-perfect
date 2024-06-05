import PropTypes from "prop-types"
import styles from "./WaitingMessage.module.css"

const WaitingMessage = ({waitingSentence}) => {
    console.log(waitingSentence)
    return <p className={styles.waitingMessage}>{waitingSentence || ""}</p>
}

WaitingMessage.propTypes = {
    waitingSentence: PropTypes.string,
}

export default WaitingMessage
