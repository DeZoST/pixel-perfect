import {useState} from "react"
import Button from "../../components/button/Button" // Assurez-vous que le chemin est correct
import styles from "./UploadPage.module.css" // Assurez-vous que le chemin est correct

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

        // Simulation de l'upload
        setTimeout(() => {
            setUploaded(true)
        }, 2000)

        // Exemple de requête pour l'upload (remplacer par votre logique d'upload)
        // try {
        //   const formData = new FormData();
        //   formData.append('file', file);
        //   formData.append('teamName', teamName);

        //   const response = await fetch('/api/upload', {
        //     method: 'POST',
        //     body: formData,
        //   });

        //   if (response.ok) {
        //     setUploaded(true);
        //   } else {
        //     setError('Échec de l\'upload, veuillez réessayer.');
        //   }
        // } catch (error) {
        //   setError('Une erreur s\'est produite, veuillez réessayer.');
        // }
    }

    return (
        <div className={styles.uploadPage}>
            <h1>Bonjour Admin</h1>
            <h2>Envoyer le contenu</h2>
            {!uploaded ? (
                <div>
                    <form onSubmit={handleUpload} className={styles.uploadForm}>
                        <div className={styles.fileInputContainer}>
                            <label htmlFor="fileInput">Importer une vidéo</label>
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
                    </form>
                </div>
            ) : (
                <div className={styles.successMessage}>
                    <p>Vidéo importée avec succès !</p>
                    <Button text="Voir la liste des vidéos" className={styles.viewVideosButton} />
                </div>
            )}
        </div>
    )
}

export default UploadPage
