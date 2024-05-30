import Button from "../../../../components/button/Button"
import styles from "./ModeratorContent.module.css"
import {useState} from "react"
import PropTypes from "prop-types"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../../../hooks/useAuth"
import {useModeratorAuthMutation} from "../../../../hooks/useAuthMutation"

const ModeratorContent = ({className}) => {
    const [code, setCode] = useState("")
    const [_, setError] = useState("")
    const navigate = useNavigate()
    const {login} = useAuth()
    const {mutate: mutateAuthModerator} = useModeratorAuthMutation()

    const handleChange = e => {
        setCode(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setError("")

        try {
            mutateAuthModerator(code, {
                onSuccess: resp => {
                    console.log(resp)
                    login(resp)
                },
                onError: error => {
                    setError(error.error || "Le mot de passe est incorrect.")
                },
            })
        } catch (error) {
            setError("Une erreur s'est produite, veuillez réessayer.")
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
