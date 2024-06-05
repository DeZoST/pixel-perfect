import PropTypes from "prop-types"
import styles from "./WaitingMessage.module.css"
import {useEffect, useState} from "react"
import axios from "axios"
import {useAuth} from "../../hooks/useAuth"

const WaitingMessage = ({initialMessage}) => {
    const [message, setMessage] = useState(initialMessage)
    const {user} = useAuth()

    useEffect(() => {
        const fetchWaitingMessage = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/game/waitingSentence`, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                })
                setMessage(response.data.message)
            } catch (error) {
                console.error("Error fetching waiting sentence:", error.response || error.message)
            }
        }

        fetchWaitingMessage()
    }, [user])

    return <p className={styles.waitingMessage}>{message}</p>
}

WaitingMessage.propTypes = {
    initialMessage: PropTypes.string.isRequired,
}

export default WaitingMessage
