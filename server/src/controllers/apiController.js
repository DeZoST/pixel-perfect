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
    // TODO: IMPLEMENT
}
