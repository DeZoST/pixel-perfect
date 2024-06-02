import express from "express"
import multer from "multer"
import path from "path"
import {openDb} from "../db/db.js"

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

router.post("/test", (req, res) => {
    res.json({message: "Hello, World!"})
})

router.post("/upload", upload.single("video"), (req, res) => {
    res.json({message: "Video uploaded successfully!"})
})

// GetTeams routes

router.get("/teams", async (req, res) => {
    try {
        const db = await openDb()
        const teams = await db.all("SELECT * FROM TEAM")
        res.json(teams)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Failed to retrieve teams"})
    }
})

// CreateOrUpdate vote route

// change waitingSentence route

// toggle pause route

// start game route
// Can't start game if ALL teams don't have a video

export default router
