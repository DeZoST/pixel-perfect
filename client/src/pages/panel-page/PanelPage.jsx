import styles from "./PanelPage.module.css"
import Button from "../../components/button/Button"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"

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
                        {/* TODO: Changer le texte et la couleur du bouton quand il est cliqué pour Arreter la partie*/}
                        <Button text="Commencer la partie" className={`${styles.buttonStart}`} />
                        {/* TODO: Changer le texte et la couleur du bouton quand la partie est en pause, pour savoir si c'est actuellement en pause ou en cours */}
                        <Button text="Metttre le jeu en pause" className={`${styles.buttonPause}`} />
                    </div>
                    <Button text="Mode Casteur" className={`${styles.buttonCaster}`} />
                </div>
            </section>
            <section className={`${styles.lobbyContainer}`}>
                <h1 className={`${styles.lobbyTitle}`}>Joueur dans le lobby</h1>
                <div>
                    <table></table>
                </div>
            </section>
        </section>
    )
}

export default PanelPage
