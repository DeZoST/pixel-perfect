import express from "express"
import multer from "multer"
import path from "path"

import {getTeams, updateWaitingSentence} from "../controllers/apiController.js"

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
    return res.json({message: "Video uploaded successfully!"})
})

router.get("/teams", async (req, res) => {
    await getTeams(req, res)
})

// CreateOrUpdate vote route

router.put("/waitingSentence", async (req, res) => {
    return await updateWaitingSentence(req, res)
})

// toggle pause route

// start game route
// Can't start game if ALL teams don't have a video

export default router
