import {useRef, useState} from "react"
import Button from "../../../../components/button/Button"
import UploadPreview from "../upload-preview/UploadPreview"
import UploadSuccess from "../upload-success/UploadSuccess"
import styles from "./Upload.module.css"

const Upload = () => {
    const fileInputRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [videoPreview, setVideoPreview] = useState(null)
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState(0)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const handleFileChange = event => {
        const file = event.target.files[0]
        if (file) {
            const fileType = file.type
            const fileSize = file.size

            if (!fileType.startsWith("video/")) {
                setErrorMessage("Le fichier sélectionné n'est pas une vidéo.")
                setVideoPreview(null)
                setFileName("")
                setFileSize(0)
            } else if (fileSize > 500 * 1024 * 1024) {
                // 500MB en octets
                setErrorMessage("Le fichier dépasse la taille maximale de 500 Mo.")
                setVideoPreview(null)
                setFileName("")
                setFileSize(0)
            } else {
                setErrorMessage("")
                setVideoPreview(URL.createObjectURL(file))
                setFileName(file.name)
                setFileSize((file.size / (1024 * 1024)).toFixed(2)) // Taille en Mo
            }
        }
    }

    const handleUploadSuccess = () => {
        setUploadSuccess(true)
    }

    return (
        <>
            {uploadSuccess ? (
                <UploadSuccess />
            ) : videoPreview ? (
                <UploadPreview
                    videoPreview={videoPreview}
                    fileName={fileName}
                    fileSize={fileSize}
                    onUploadSuccess={handleUploadSuccess}
                />
            ) : (
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
            )}
        </>
    )
}

export default Upload
