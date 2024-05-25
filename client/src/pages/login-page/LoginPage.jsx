import styles from "./LoginPage.module.css"
import Button from "../../components/button/Button"
import Switch from "../../components/switch/Switch"
import Title from "../../components/title/Title"

const LoginPage = () => {
  return (
    <section className={`${styles.loginPage}`}>
      <div className={"container"}>
        <Switch label="Mode Modérateur" isChecked={false} />
        <Title level={1} title="Connexion Pixel Perfect" />
        <Button logo="/images/microsoft-logo.png" text="Se connecter à Microsoft" className={`${styles.button}`} />
      </div>
    </section>
  )
}

export default LoginPage