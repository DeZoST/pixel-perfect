import {useEffect, useState} from "react"
import styles from "./SwitchTeamPage.module.css"
import Title from "../../components/title/Title"
import ButtonDisconnect from "../../components/button-disconnect/ButtonDisconnect"
import {useAuth} from "../../hooks/useAuth"
import Button from "../../components/button/Button"
import axios from "axios"
import {useSearchParams} from "react-router-dom"

const SwitchTeam = () => {
    const {user, name, login} = useAuth()
    const [teams, setTeams] = useState([])
    const [selectedTeam, setSelectedTeam] = useState("")
    const [searchParams, _] = useSearchParams()
    const handleSubmit = async e => {
        e.preventDefault()
        if (!selectedTeam) {
            alert("Veuillez sélectionner une équipe.")
            return
        }
        let response
        try {
            response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/switch-team?bypass=${searchParams.get("bypass")}`,
                {
                    team: selectedTeam,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`,
                    },
                },
            )
        } catch (error) {
            return alert(error.response.data.error || "Une erreur est survenue.")
        }
        login(response.data)
    }

    useEffect(() => {
        async function fetchTeams() {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/teams`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
            const teamData = await response.json()
            setTeams(teamData)
        }
        fetchTeams()
    }, [])

    return (
        <section className={styles.switchTeamPage}>
            <div className={`${styles.Container} container`}>
                <header className={`${styles.header}`}>
                    <ButtonDisconnect className={`${styles.button}`} />
                </header>
                <Title
                    level={1}
                    title={`Bonjour ${name}`}
                    subtitle="Nous n'avons pas trouvé votre pseudo minecraft dans notre liste de joueurs, veuillez sélectionner votre Équipe"
                    className={styles.title}
                />
                <div className={styles.switchTeamContainer}>
                    <form className={styles.switchTeamForm} onSubmit={handleSubmit}>
                        <header className={styles.headerForm}>
                            <h3 className={styles.label} htmlFor="fileInput">
                                Sélectionnez votre équipe
                            </h3>
                        </header>
                        <div className={styles.previewContainer}>
                            <div className={styles.teamInfo}>
                                <select
                                    name="teamName"
                                    value={selectedTeam}
                                    onChange={e => setSelectedTeam(e.target.value)}
                                    className={styles.teamDropdown}
                                    required
                                >
                                    <option value="">Équipes</option>
                                    {teams.map(team => (
                                        <option key={team.ID} value={team.ID}>
                                            {team.NAME}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Button type="submit" text="Envoyer" className={styles.switchTeamButton} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

SwitchTeam.propTypes = {}

export default SwitchTeam
