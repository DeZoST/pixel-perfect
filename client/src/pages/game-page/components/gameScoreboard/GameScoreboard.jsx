import PropTypes from "prop-types"
import styles from "./GameScoreboard.module.css"

const GameScoreboard = ({leaderboard}) => {
    const topTeams = leaderboard.slice(0, 3)
    const otherTeams = leaderboard.slice(3)

    const generateWoolImages = team => {
        const woolImages = []
        const colors = ["red", "pink", "lime", "green", "blue", "yellow"]

        colors.forEach(color => {
            const count = team[color]
            for (let i = 0; i < count; i++) {
                woolImages.push(
                    <img
                        key={`${color}-${i}`}
                        src={`/images/wool-${color}.png`}
                        alt={`${color} wool`}
                        className={styles.wool}
                    />,
                )
            }
        })

        return woolImages
    }

    return (
        <section className={styles.scoreBoardPage}>
            <div className="container">
                <h1 className={styles.title}>Classement</h1>
                <div className={styles.scoreBoardContainer}>
                    <ol className={styles.topTeamsContainer}>
                        {topTeams.map((team, index) => (
                            <li key={team.teamId} className={styles.topTeamCard}>
                                <span className={styles.rank}>{index + 1}.</span>
                                <div className={styles.teamInfo}>
                                    <h2 className={styles.teamName}>{team.teamName}</h2>
                                    <p className={styles.points}>{team.points} points</p>
                                    <div className={styles.woolsContainer}>{generateWoolImages(team)}</div>
                                </div>
                                <span className={styles.divider}></span>
                            </li>
                        ))}
                    </ol>
                    <ul className={styles.otherTeamsList}>
                        {otherTeams.map((team, index) => (
                            <li key={team.teamId} className={styles.otherTeamCard}>
                                <span className={styles.rankOther}>{index + 4}.</span>
                                <div>
                                    <h3 className={styles.teamNameOther}>{team.teamName}</h3>
                                    <p className={styles.pointsOther}>{team.points} points</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

GameScoreboard.propTypes = {
    leaderboard: PropTypes.arrayOf(PropTypes.object),
}

export default GameScoreboard
