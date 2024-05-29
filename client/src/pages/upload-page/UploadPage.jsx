import {useState} from "react"
import Button from "../../components/button/Button"
import styles from "./UploadPage.module.css"
import Title from "../../components/title/Title"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"

const UploadPage = () => {
    const [file, setFile] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const [error, setError] = useState("")
    const [teamName, setTeamName] = useState("")

    const handleFileChange = e => {
        setFile(e.target.files[0])
    }

    const handleTeamNameChange = e => {
        setTeamName(e.target.value)
    }

    const handleUpload = async e => {
        e.preventDefault()
        setError("")
        if (!file) {
            setError("Veuillez sélectionner un fichier.")
            return
        }
    }

    return (
        <section className={styles.uploadPage}>
            <div className={`${styles.Container} container`}>
                <header className={`${styles.header} animate__animated animate__fadeInRight`}>
                    <ButtonDisconnect className={`${styles.button} animate__animated animate__fadeInRight`} />
                </header>
                <Title level={1} title="Bonjour Admin" subtitle="Envoyer le contenu" className={styles.title} />
                {!uploaded ? (
                    <div className={styles.uploadContainer}>
                        <form onSubmit={handleUpload} className={styles.uploadForm}>
                            <header>
                                <label className={styles.label} htmlFor="fileInput">
                                    Importer une vidéo
                                </label>
                            </header>
                            <hr />
                            <section className={styles.uploadSection}>
                                <div className={styles.fileInputContainer}>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className={styles.fileInput}
                                    />
                                </div>
                                {file && (
                                    <div className={styles.fileDetails}>
                                        <p>{file.name}</p>
                                        <p>{(file.size / 1024 / 1024).toFixed(2)} Mo</p>
                                    </div>
                                )}
                                <div className={styles.teamNameContainer}>
                                    <label htmlFor="teamName">Nom de l&apos;équipe</label>
                                    <input
                                        type="text"
                                        id="teamName"
                                        value={teamName}
                                        onChange={handleTeamNameChange}
                                        required
                                        className={styles.teamNameInput}
                                    />
                                </div>
                                {error && <p className={styles.error}>{error}</p>}
                                <Button type="submit" text="Envoyer" className={styles.submitButton} />
                            </section>
                        </form>
                    </div>
                ) : (
                    <div className={styles.successMessage}>
                        <p>Vidéo importée avec succès !</p>
                        <Button text="Voir la liste des vidéos" className={styles.viewVideosButton} />
                    </div>
                )}
            </div>
        </section>
    )
}

export default UploadPage
