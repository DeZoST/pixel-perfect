import Button from "../../../../components/button/Button"
import styles from "./ModeratorContent.module.css"
import {useState} from "react"
import PropTypes from "prop-types"
import {useNavigate} from "react-router-dom"

const ModeratorContent = ({className}) => {
    const [code, setCode] = useState("")
    const [_, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = e => {
        setCode(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch("/api/verify-admin-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({code}),
            })

            if (response.ok) {
                navigate("/admin-game")
            } else {
                const data = await response.json()
                setError(data.message || "Le mot de passe est pas bon")
            }
        } catch (error) {
            setError("Une erreur s'est produite quetpart")
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.moderatorContent} ${className}`}>
            <div className={styles.codeContainer}>
                <h2 className={styles.codeTitle}>Code du Modérateur :</h2>
                <input
                    type="password"
                    id="code"
                    value={code}
                    onChange={handleChange}
                    required
                    placeholder="Insérer ici le code..."
                    className={styles.codeInput}
                ></input>
                {_ && <p className={styles.error}>{_}</p>}
            </div>
            <div className={styles.buttonContainer}>
                <Button type="submit" text="Prochaine étape" className={styles.button}></Button>
            </div>
        </form>
    )
}

ModeratorContent.propTypes = {
    className: PropTypes.string,
}

export default ModeratorContent
