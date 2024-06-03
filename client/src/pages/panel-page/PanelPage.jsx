import styles from "./PanelPage.module.css"
import Button from "../../components/button/Button"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import Switch from "../../components/switch/Switch"

const PanelPage = () => {
    return (
        <section className={`${styles.panelPage} container`}>
            <section className={`${styles.panelContainer}`}>
                <div className={`${styles.panel}`}>
                    <header className={`${styles.header}`}>
                        <ButtonDisconnect className={`${styles.buttonDisconnect}`} />
                    </header>
                    <div className={`${styles.panelMessageContainer}`}>
                        <div className={`${styles.messageContainer}`}>
                            <h2 className={`${styles.messageTitle}`}>Phrase d&apos;attente</h2>
                            <input
                                type="text"
                                placeholder="Phrase d'attente"
                                className={`${styles.messageInput}`}
                            ></input>
                        </div>
                        <Button text="Confirmer" className={`${styles.buttonConfirm}`} />
                    </div>
                </div>
                <div className={`${styles.buttonsContainer}`}>
                    <div className={`${styles.gameControlContainer}`}>
                        <Button text="Commencer la partie" />
                        <div className={`${styles.switchContainer}`}>
                            <h3 className={`${styles.switchTitle}`}>Mettre le jeu en pause :</h3>
                            <Switch />
                        </div>
                    </div>
                    <Button text="Mode Casteur" className={`${styles.buttonCaster}`} />
                </div>
            </section>
            <section className={`${styles.lobbyContainer}`}>
                <div>
                    <h1>Joueur dans le lobby</h1>
                </div>
                <div>
                    <table></table>
                </div>
            </section>
        </section>
    )
}

export default PanelPage
