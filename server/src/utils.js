import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"
import {openDb} from "./db/db.js"

export function snakeToCamel(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => snakeToCamel(item))
    } else {
        const newObj = {}
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // Convert key to lowercase, then to camelCase
                const camelCaseKey = key.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
                newObj[camelCaseKey] = obj[key]
            }
        }
        return newObj
    }
}

export async function sendGameUpdates() {
    const db = await openDb()
    const game = await db.get(
        "SELECT GAME.*, COALESCE(TEAM.NAME, '') as CURRENT_TEAM_NAME FROM GAME LEFT JOIN TEAM ON GAME.CURRENT_TEAM_ID = TEAM.ID",
    )
    global.io.emit("game.listen", snakeToCamel(game))
}

export async function sendPlayersOnlineUpdate() {
    const db = await openDb()
    const players = await db.all(
        "SELECT PLAYER.*, COALESCE(TEAM.NAME, 'Sans Équipe') as TEAM_NAME FROM PLAYER LEFT JOIN TEAM ON PLAYER.TEAM_ID = TEAM.ID",
    )
    global.io.to("moderators").emit("players.listen", snakeToCamel(players))
}

export async function decodeAndVerifyToken(token) {
    const privateKey = fs.readFileSync(path.resolve(process.cwd(), "./RS256.key"))
    try {
        const decodedToken = jwt.verify(token, privateKey, {algorithms: ["RS256"]})
        return decodedToken
    } catch (error) {
        console.error(error.message)
        return false
    }
}

export function getWoolColor(wool) {
    switch (wool) {
        case 1:
            return "red"
        case 2:
            return "pink"
        case 3:
            return "lime"
        case 4:
            return "green"
        case 5:
            return "blue"
        case 6:
            return "yellow"
        default:
            return null
    }
}
