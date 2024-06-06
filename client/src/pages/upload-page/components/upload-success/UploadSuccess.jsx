import styles from "./UploadSuccess.module.css"
import Button from "../../../../components/button/Button"

const UploadSuccess = () => {
    return (
        <div className={styles.uploadContainer}>
            <form className={styles.uploadForm}>
                <header className={styles.headerForm}>
                    <h3 className={styles.label} htmlFor="fileInput">
                        Importer une vidéo
                    </h3>
                    <hr />
                </header>
                <div className={styles.successContainer}>
                    <p className={styles.successText}>Vidéo importée avec succés</p>
                    <Button text="Faire un autre upload" className={styles.button} />
                </div>
            </form>
        </div>
    )
}

export default UploadSuccess
