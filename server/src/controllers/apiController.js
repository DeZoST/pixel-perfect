import {openDb} from "../db/db.js"

export async function getTeams(req, res) {
    try {
        const db = await openDb()
        const teams = await db.all("SELECT * FROM TEAM")
        return res.json(teams)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error.message})
    }
}

export async function createOrUpdateVote(req, res) {
    try {
        const db = await openDb()

        await db.run(
            "REPLACE INTO VOTE (WOOL, TEAM_ID, PLAYER_ID, IS_JURY) VALUES (?, ?, ?, ?)",
            req.body.wool,
            req.body.teamId,
            req.user.id,
            req.user.role === "moderator",
        )

        const votes = await db.get(
            "SELECT SUM(CASE WHEN WOOL = 1 THEN 1 ELSE 0 END) AS red, " +
                "SUM(CASE WHEN WOOL = 2 THEN 1 ELSE 0 END) AS pink, " +
                "SUM(CASE WHEN WOOL = 3 THEN 1 ELSE 0 END) AS lime, " +
                "SUM(CASE WHEN WOOL = 4 THEN 1 ELSE 0 END) AS green, " +
                "SUM(CASE WHEN WOOL = 5 THEN 1 ELSE 0 END) AS blue, " +
                "SUM(CASE WHEN WOOL = 6 THEN 1 ELSE 0 END) AS yellow " +
                "FROM VOTE WHERE TEAM_ID = (select CURRENT_TEAM_ID from GAME)",
        )
        global.io.to("moderators").emit("vote.listen", votes)
        return res.json({message: "Vote updated successfully!"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error.message})
    }
}
