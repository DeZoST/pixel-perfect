import Button from "../../../../components/button/Button"
import styles from "./UploadPreview.module.css"
import Proptypes from "prop-types"

const UploadPreview = ({videoPreview, fileName, fileSize, onUploadSuccess}) => {
    return (
        <div className={styles.previewContainer}>
            <video className={styles.videoPreview} controls>
                <source src={videoPreview} type="video/mp4" />
                Votre navigateur ne supporte pas la balise vidéo.
            </video>
            <div className={styles.fileInfo}>
                <p>
                    <strong>Nom du fichier :</strong> {fileName}
                </p>
                <p>
                    <strong>Taille du fichier :</strong> {fileSize} Mo
                </p>
            </div>
            <Button type="button" text="Confirmer l'upload" onClick={onUploadSuccess} className={styles.uploadButton} />
        </div>
    )
}

UploadPreview.propTypes = {
    videoPreview: Proptypes.string.isRequired,
    fileName: Proptypes.string.isRequired,
    fileSize: Proptypes.string.isRequired,
    onUploadSuccess: Proptypes.func.isRequired,
}

export default UploadPreview
