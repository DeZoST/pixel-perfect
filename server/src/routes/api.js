import express from "express"
import multer from "multer"
import path from "path"

import {getTeams, createOrUpdateVote} from "../controllers/apiController.js"
import {isModeratorMiddleware} from "../middlewares/isModeratorMiddleware.js"
import {openDb} from "../db/db.js"
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
    await db.run("UPDATE TEAM SET HAS_VIDEO = TRUE WHERE ID = ?", req.body.team)
    return await res.json({message: "Video uploaded successfully!"})
})

router.get("/teams", async (req, res) => {
    return await getTeams(req, res)
})

router.put("/game/vote", async (req, res) => {
    return await createOrUpdateVote(req, res)
})

export default router
