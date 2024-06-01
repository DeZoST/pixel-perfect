import Button from "../../../../components/button/Button"
import styles from "./UploadPreview.module.css"
import Proptypes from "prop-types"

const UploadPreview = ({videoPreview, fileName, fileSize, onUploadSuccess, onReset}) => {
    return (
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
                <label htmlFor="teamName">Nom de l&apos;équipe</label>
                <input type="text" name="teamName" id="teamName" placeholder="Daniell" />
            </div>
            <Button type="button" text="Envoyer" onClick={onUploadSuccess} className={styles.uploadButton} />
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
