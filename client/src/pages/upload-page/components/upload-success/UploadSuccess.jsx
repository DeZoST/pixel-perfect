import styles from "./UploadSuccess.module.css"

const UploadSuccess = () => {
    return (
        <div className={styles.successMessage}>
            <h2>Upload réussi !</h2>
            <p>Votre fichier vidéo a été téléchargé avec succès.</p>
        </div>
    )
}

export default UploadSuccess
