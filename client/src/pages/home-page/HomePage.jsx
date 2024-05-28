import PropTypes from "prop-types"
import styles from "./HomePage.module.css"
import "animate.css"
import Logo from "../../components/logo/Logo"
import Button from "../../components/button/Button"

const AnimatedText = ({text}) => {
    return (
        <div className={styles.animatedText}>
            {text.split("").map((char, index) => (
                <span key={index} className={styles.animatedChar}>
                    {char}
                </span>
            ))}
        </div>
    )
}

AnimatedText.propTypes = {
    text: PropTypes.string.isRequired,
}

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <Logo className={"animate__animated animate__zoomInLeft"} />
            <main className={styles.main}>
                <section className={`${styles.heroBanner} container`}>
                    <div className={`${styles.heroBannerTitleContainer} animate__animated animate__zoomInDown`}>
                        <img
                            src="/images/top-left-shape.png"
                            alt="top left shape for title"
                            className={`${styles.shape} ${styles.topLeftShape}`}
                        />
                        <img
                            src="/images/top-rectangle-shape.png"
                            alt="top rectangle shape for title"
                            className={`${styles.shape} ${styles.topRectangleShape1}`}
                        />
                        <img
                            src="/images/top-rectangle-shape.png"
                            alt="top rectangle shape for title"
                            className={`${styles.shape} ${styles.topRectangleShape2}`}
                        />
                        <img
                            src="/images/bottom-right-shape.png"
                            alt="bottom right shape for title"
                            className={`${styles.shape} ${styles.bottomRightShape}`}
                        />
                        <h1 className={`${styles.heroBannerTitle}`}>Pixel Perfect</h1>
                        <h2 className={styles.heroBannerSubtitle}>
                            Qui aura la plus grosse ? <AnimatedText text="(culture générale)" />
                        </h2>
                    </div>
                    <Button
                        text="Commencer"
                        className={`${styles.button} animate__animated animate__zoomInUp`}
                        to="/login"
                    />
                </section>
            </main>
        </div>
    )
}

export default HomePage
