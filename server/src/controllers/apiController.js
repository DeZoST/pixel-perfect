import {openDb} from "../db/db.js"

export async function getTeams(req, res) {
    try {
        const db = await openDb()
        const teams = await db.all("SELECT * FROM TEAM")
        return res.json(teams)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed to retrieve teams"})
    }
}

export async function updateWaitingSentence(req, res) {
    try {
        const db = await openDb()
        await db.run("UPDATE GAME SET WAITING_SENTENCE = ?", req.body.sentence)
        res.json({message: "Waiting sentence updated successfully!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Failed to update waiting sentence"})
    }
}
