import express from "express"
import {authenticateUser, getMicrosoftToken} from "../controllers/authController.js"

const router = express.Router()

router.get("/callback", async (req, res) => {
    try {
        return res.redirect("http://localhost:5173/login?access_token=" + (await getMicrosoftToken(req))) // TODO : add to .env
    } catch (error) {
        return res.redirect(`http://localhost:5173/login?error=${error.message}`) // TODO : add to .env
    }
})

router.post("/auth", async (req, res) => {
    try {
        return res.json(await authenticateUser(req))
    } catch (error) {
        return res.status(500).json({error: error.message, stackTrace: error.stack})
    }
})

export default router
