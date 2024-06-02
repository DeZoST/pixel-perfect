import express from "express"
import multer from "multer"
import path from "path"

import {getTeams, createOrUpdateVote} from "../controllers/apiController.js"
const router = express.Router()
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads/")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)) // Save files with a unique name
        },
    }),
})

router.post("/upload", upload.single("video"), (req, res) => {
    // TODO : modify the HAS_VIDEO of the corresponding team & rename the file with the team name
    return res.json({message: "Video uploaded successfully!"})
})

router.get("/teams", async (req, res) => {
    return await getTeams(req, res)
})

router.put("/vote", async (req, res) => {
    return await createOrUpdateVote(req, res)
})

export default router
