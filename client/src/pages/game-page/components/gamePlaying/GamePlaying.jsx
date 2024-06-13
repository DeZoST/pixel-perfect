import {useEffect, useRef, useState} from "react"
import Title from "../../../../components/title/Title"
import Wool from "../../../../components/wool/Wool"
import Button from "../../../../components/button/Button"
import styles from "./GamePlaying.module.css"
import PropTypes from "prop-types"
import axios from "axios"
import {useAuth} from "../../../../hooks/useAuth"

const GamePlaying = ({game, votes}) => {
    const videoRef = useRef(null)
    const [selectedVote, setSelectedVote] = useState(null)
    const {user, role, team} = useAuth()
    const [showLiveScore, setShowLiveScore] = useState(false)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
        }
        setSelectedVote(null) // Reset selected vote when the team changes
    }, [game.currentTeamId])

    const handleVote = async vote => {
        if (game.isPaused) {
            alert("La partie est en pause, vous ne pouvez pas voter.")
            return
        }

        setSelectedVote(vote)

        try {
            await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/game/vote`,
                {
                    wool: vote,
                    teamId: game.currentTeamId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`,
                    },
                },
            )
        } catch (error) {
            alert(
                `Erreur lors de la soumission du vote: ${error.response ? error.response.data.message : error.message}`,
            )
        }
    }

    console.log(team, game.currentTeamId)

    return (
        <section className={`${styles.gamePlayingPage}`}>
            <section className={`${styles.gamePlayingContainer} container`}>
                <header>
                    {game.isPaused ? (
                        <Title level={1} title="La partie est en pause" className={styles.title} />
                    ) : (
                        <Title level={1} title="Votez la qualité de la vidéo" className={styles.title} />
                    )}

                    <div className={`${styles.timerContainer}`}>
                        <h2 className={`${styles.timerText}`}>{game.secondsRemaining} secondes restantes</h2>
                        {role === "moderator" && (
                            <Button
                                className={`${styles.timerButton}`}
                                onClick={() => setShowLiveScore(!showLiveScore)}
                                text={showLiveScore ? "Cacher les scores" : "Afficher les scores"}
                            />
                        )}
                    </div>
                </header>
                <div className={`${styles.mainGameContainer}`}>
                    <div>
                        <h2 className={`${styles.teamName}`}>Team {game.currentTeamName}</h2>
                        <video className={`${styles.video}`} ref={videoRef} autoPlay controls>
                            <source
                                src={`${import.meta.env.VITE_SERVER_URL}/uploads/${game.currentTeamId}.mp4`}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div className={`${styles.woolsContainer}`}>
                        {team != game.currentTeamId &&
                            [
                                {number: 1, rarity: "Superpoop", color: "red"},
                                {number: 2, rarity: "Poop", color: "pink"},
                                {number: 3, rarity: "Good", color: "lime"},
                                {number: 4, rarity: "Very good", color: "green"},
                                {number: 5, rarity: "Epic", color: "blue"},
                                {number: 6, rarity: "Legendary", color: "yellow"},
                            ].map(wool => (
                                <Wool
                                    key={wool.number}
                                    number={wool.number}
                                    rarity={wool.rarity}
                                    color={wool.color}
                                    onClick={() => handleVote(wool.number)}
                                    selected={selectedVote === wool.number}
                                    dimmed={selectedVote !== null && selectedVote !== wool.number}
                                    votes={role === "moderator" ? votes[wool.color] : null}
                                    showLiveScore={showLiveScore}
                                />
                            ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

GamePlaying.propTypes = {
    game: PropTypes.object,
    votes: PropTypes.object,
}

export default GamePlaying
