import Button from "../../components/button/Button"
import styles from "./UploadPage.module.css"
import Title from "../../components/title/Title"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"

const UploadPage = () => {
    return (
        <section className={styles.uploadPage}>
            <div className={`${styles.Container} container`}>
                <header className={`${styles.header} animate__animated animate__fadeInRight`}>
                    <ButtonDisconnect className={`${styles.button} animate__animated animate__fadeInRight`} />
                </header>
                <Title level={1} title="Bonjour Admin" subtitle="Envoyer le contenu" className={styles.title} />

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
                                <Button text="Séléctionner un fichier" className={styles.uploadButton} />
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UploadPage
