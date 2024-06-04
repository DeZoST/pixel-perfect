import PropTypes from "prop-types"
import styles from "./WaitingMessage.module.css"
import {io} from "socket.io-client"
import {useEffect, useState} from "react"

const socket = io("http://localhost:3000")

const WaitingMessage = ({initialMessage}) => {
    const [message, setMessage] = useState(initialMessage)

    useEffect(() => {
        socket.on("waitingSentenceUpdated", newMessage => {
            setMessage(newMessage)
        })

        return () => {
            socket.off("waitingSentenceUpdated")
        }
    }, [])

    return <p className={styles.waitingMessage}>{message}</p>
}

WaitingMessage.propTypes = {
    initialMessage: PropTypes.string.isRequired,
}

export default WaitingMessage
