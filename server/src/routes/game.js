import {
    pause,
    resume,
    updateWaitingSentence,
    getWaitingSentence,
    start,
    handleResetGame,
} from "../controllers/gameController.js"
import express from "express"

const router = express.Router()

router.post("/waitingSentence", async (req, res, next) => {
    await updateWaitingSentence(req, res)
    next()
})

router.get("/waitingSentence", async (req, res, next) => {
    await getWaitingSentence(req, res)
    next()
})

router.post("/pause", async (req, res, next) => {
    await pause(req, res)
    next()
})

router.post("/resume", async (req, res, next) => {
    await resume(req, res)
    next()
})

router.post("/start", async (req, res, next) => {
    await start(req, res)
    next()
})

router.post("/reset", async (req, res, next) => {
    await handleResetGame(req, res)
    next()
})

export default router
