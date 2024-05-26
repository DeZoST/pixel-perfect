import styles from './UserContent.module.css';
import Button from '../button/Button';


const UserContent = () => {
    return (
        <div className={`${styles.buttonContainer}`}><Button logo="/images/microsoft-logo.png" text="Se connecter à Microsoft" className={`${styles.button}`} /></div> 
    )
}

export default UserContent;