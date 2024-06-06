import {useState, useEffect} from "react"
import Button from "../../../../components/button/Button"
import styles from "./UploadPreview.module.css"
import Proptypes from "prop-types"
import {useAuth} from "../../../../hooks/useAuth"

const UploadPreview = ({videoPreview, fileName, fileSize, onUploadSuccess, onReset}) => {
    const [teams, setTeams] = useState([])
    const [selectedTeam, setSelectedTeam] = useState("")
    const {user} = useAuth()

    useEffect(() => {
        async function fetchTeams() {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/teams`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
            const teamData = await response.json()
            setTeams(teamData)
        }
        fetchTeams()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if (!selectedTeam) {
            alert("Veuillez sélectionner une équipe.")
            return
        }
        onUploadSuccess(selectedTeam)
    }

    return (
        <div className={styles.uploadContainer}>
            <form className={styles.uploadForm} onSubmit={handleSubmit}>
                <header className={styles.headerForm}>
                    <h3 className={styles.label} htmlFor="fileInput">
                        Importer une vidéo
                    </h3>
                    <hr />
                </header>
                <div className={styles.previewContainer}>
                    <video className={styles.videoPreview} controls>
                        <source src={videoPreview} type="video/mp4" />
                        Votre navigateur ne supporte pas la balise vidéo.
                    </video>
                    <div className={styles.fileInfo}>
                        <p>{fileName}</p>
                        <p>{fileSize}Mo</p>
                    </div>
                    <Button
                        type="button"
                        text="Sélectionner un autre fichier"
                        onClick={onReset}
                        className={styles.uploadButton}
                    />
                    <input type="file" style={{display: "none"}} accept="video/*" />
                    <div className={styles.teamInfo}>
                        <label htmlFor="teamName" className={styles.teamLabel}>
                            Nom de l&apos;équipe
                        </label>
                        <select
                            name="teamName"
                            value={selectedTeam}
                            onChange={e => setSelectedTeam(e.target.value)}
                            className={styles.teamDropdown}
                            required
                        >
                            <option value="">Sélectionner une équipe</option>
                            {teams.map(team => (
                                <option key={team.ID} value={team.ID}>
                                    {team.NAME} {team.HAS_VIDEO ? "✔️" : "❌"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" text="Envoyer" className={styles.uploadButton} />
                </div>
            </form>
        </div>
    )
}

UploadPreview.propTypes = {
    videoPreview: Proptypes.string.isRequired,
    fileName: Proptypes.string.isRequired,
    fileSize: Proptypes.string.isRequired,
    onUploadSuccess: Proptypes.func.isRequired,
    onReset: Proptypes.func.isRequired,
}

export default UploadPreview
