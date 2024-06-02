import {pause, resume, updateWaitingSentence, start, handleResetGame} from "../controllers/gameController.js"
import express from "express"

const router = express.Router()

router.put("/waitingSentence", async (req, res) => {
    return await updateWaitingSentence(req, res)
})

router.post("/pause", async (req, res) => {
    return await pause(req, res)
})

router.post("/resume", async (req, res) => {
    return await resume(req, res)
})

router.post("/start", async (req, res) => {
    return await start(req, res)
})

router.post("/reset", async (req, res) => {
    return await handleResetGame(req, res)
})

export default router
