import Button from "../../../../components/button/Button"
import styles from "./ModeratorContent.module.css"
import {useState} from "react"
import PropTypes from "prop-types"

const ModeratorContent = ({className}) => {
    const [code, setCode] = useState("")
    const [_, setError] = useState("")

    const handleChange = e => {
        setCode(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch("/api/pourLinstantRien", {
                method: "POST",
            })
        } catch (error) {
            setError("Une erreur s'est produite quetpart")
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.moderatorContent} ${className}`}>
            <div className={styles.codeContainer}>
                <h2 className={styles.codeTitle}>Code du Modérateur :</h2>
                <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={handleChange}
                    required
                    placeholder="Insérer ici le code..."
                    className={styles.codeInput}
                ></input>
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
