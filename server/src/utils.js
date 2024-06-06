import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"
import {openDb} from "./db/db.js"

export function snakeToCamel(obj) {
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

export async function sendGameUpdates() {
    const db = await openDb()
    const game = await db.get("SELECT * FROM GAME")
    const team = await db.get("SELECT * FROM TEAM WHERE ID = ?", game.CURRENT_TEAM_ID)
    game.CURRENT_TEAM_NAME = team.NAME
    global.io.emit("game.listen", snakeToCamel(game))
}

export async function decodeAndVerifyToken(token) {
    const privateKey = fs.readFileSync(path.resolve(process.cwd(), "./RS256.key"))
    try {
        const decodedToken = await jwt.verify(token, privateKey, {algorithms: ["RS256"]})
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
