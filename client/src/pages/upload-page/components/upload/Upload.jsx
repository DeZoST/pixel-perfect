import {useRef, useState} from "react"
import Button from "../../../../components/button/Button"
import UploadPreview from "../upload-preview/UploadPreview"
import UploadSuccess from "../upload-success/UploadSuccess"
import styles from "./Upload.module.css"
import axios from "axios"
import {useAuth} from "../../../../hooks/useAuth"

const Upload = () => {
    const fileInputRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [videoPreview, setVideoPreview] = useState(null)
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState(0)
    const [file, setFile] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const {user} = useAuth()

    const submitForm = team => {
        const UPLOAD_URL = `${import.meta.env.VITE_SERVER_URL}/api/upload?team=${team}`
        const formData = new FormData()
        formData.append("video", file)
        axios
            .post(UPLOAD_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
            .then(res => {
                setUploadSuccess(true)
            })
            .catch(err => alert("Une erreur est survenue lors de l'envoi de la vidéo."))
    }

    const handleFileChange = event => {
        const file = event.target.files[0]
        if (file) {
            const fileType = file.type
            const fileSize = file.size

            if (!fileType.startsWith("video/mp4")) {
                setErrorMessage("Le fichier sélectionné n'est pas une vidéo ou n'est pas au format mp4.")
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
                setFile(file)
                setFileName(file.name)
                setFileSize((file.size / (1024 * 1024)).toFixed(2)) // Taille en Mo
            }
        }
    }

    const handleReset = () => {
        setVideoPreview(null)
        setFileName("")
        setFileSize(0)
        setUploadSuccess(false)
        setErrorMessage("")
        fileInputRef.value = ""
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
                    onUploadSuccess={submitForm}
                    onReset={handleReset}
                />
            ) : (
                <div className={styles.uploadContainer}>
                    <form className={styles.uploadForm}>
                        <header className={styles.headerForm}>
                            <h3 className={styles.label} htmlFor="fileInput">
                                Importer une vidéo
                            </h3>
                            <hr />
                        </header>
                        <section className={styles.uploadSection}>
                            <div className={styles.uploadIconContainer}>
                                <img src="/images/upload-icon.png" alt="upload icon" />
                            </div>
                            <div className={styles.uploadDescriptionContainer}>
                                <p className={styles.uploadDescription}>
                                    Glisser-déposer un fichier vidéo à télécharger
                                </p>
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
                                    accept="video/mp4"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        </section>
                    </form>
                </div>
            )}
        </>
    )
}

export default Upload
