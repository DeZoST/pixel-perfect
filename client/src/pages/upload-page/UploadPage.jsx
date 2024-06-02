import styles from "./UploadPage.module.css"
import Title from "../../components/title/Title"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import Upload from "./components/upload/Upload"

const UploadPage = () => {
    return (
        <section className={styles.uploadPage}>
            <div className={`${styles.Container} container`}>
                <header className={`${styles.header} animate__animated animate__fadeInRight`}>
                    <ButtonDisconnect className={`${styles.button} animate__animated animate__fadeInRight`} />
                </header>
                <Title level={1} title="Bonjour Admin" subtitle="Envoyer le contenu" className={styles.title} />

                <Upload />
            </div>
        </section>
    )
}

export default UploadPage
