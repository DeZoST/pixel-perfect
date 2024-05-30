import {useRef, useState} from "react"
import styles from "./Upload.module.css"
import Button from "../../../../components/button/Button"

const Upload = () => {
    const fileInputRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")

    const handleFileChange = event => {
        const file = event.target.files[0]
        if (file) {
            const fileType = file.type
            const fileSize = file.size

            if (!fileType.startsWith("video/")) {
                setErrorMessage("Le format déposé n'est pas une vidéo. Veuillez réessayer.")
            } else if (fileSize > 500 * 1024 * 1024) {
                // 500MB in bytes
                setErrorMessage("La taille de la vidéo ne doit pas dépasser 500Mo. Veuillez réessayer")
            }
        }
    }

    return (
        <>
            <div className={styles.uploadIconContainer}>
                <img src="/images/upload-icon.png" alt="upload icon" />
            </div>
            <div className={styles.uploadDescriptionContainer}>
                <p className={styles.uploadDescription}>Glisser-déposer un fichier vidéo à télécharger</p>
                <p className={`${styles.uploadDescription} ${styles.or}`}>ou</p>
                <Button
                    type="button"
                    text="Sélectionner un fichier"
                    className={styles.uploadButton}
                    inputRef={fileInputRef}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: "none"}}
                    accept="video/*"
                    onChange={handleFileChange}
                />
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </>
    )
}

export default Upload
