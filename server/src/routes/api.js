import express from "express"
import multer from "multer"
import path from "path"

import {getTeams, createOrUpdateVote} from "../controllers/apiController.js"
import {isModeratorMiddleware} from "../middlewares/isModeratorMiddleware.js"
import {openDb} from "../db/db.js"
import fs from "fs"
import jwt from "jsonwebtoken"
import {sendPlayersOnlineUpdates} from "../utils.js"

const router = express.Router()
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads/")
        },
        filename: (req, file, cb) => {
            cb(null, req.query.team + path.extname(file.originalname)) // Save files with a unique name
        },
    }),
})

router.post("/upload", isModeratorMiddleware, upload.single("video"), async (req, res) => {
    const db = await openDb()
    await db.run("UPDATE TEAM SET HAS_VIDEO = TRUE WHERE ID = ?", req.query.team)
    return await res.json({message: "Video uploaded successfully!"})
})

router.get("/teams", async (req, res) => {
    return await getTeams(req, res)
})

router.put("/game/vote", async (req, res) => {
    return await createOrUpdateVote(req, res)
})

router.post("/switch-team", async (req, res) => {
    try {
        const db = await openDb()
        const game = await db.get("SELECT * FROM GAME")
        if (game.IS_STARTED && req.query.bypass !== "true") {
            return res.status(400).json({error: "La partie a déjà commencé."})
        }
        await db.run("UPDATE PLAYER SET TEAM_ID = ? WHERE ID = ?", req.body.team, req.user.id)
        const privateKey = fs.readFileSync(path.resolve(process.cwd(), "./RS256.key"))
        const params = req.user
        params.team = req.body.team
        const token = jwt.sign(params, privateKey, {
            algorithm: "RS256",
        })
        await sendPlayersOnlineUpdates()
        return res.json({jwt: token})
    } catch (error) {
        return res.status(error.code || 500).json({error: error.message, stackTrace: error.stack})
    }
})

export default router
