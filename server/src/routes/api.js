import express from "express"
import multer from "multer"
import path from "path"

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

// vote route

// change waitingSentence route

// toggle pause route

// start game route

export default router
