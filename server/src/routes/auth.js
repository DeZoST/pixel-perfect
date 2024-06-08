import express from "express"
import {authenticateModerator, authenticateUser, getMicrosoftToken} from "../controllers/authController.js"

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
        if (req.body.token) {
            const token = await authenticateUser(req)
            return res.json(token)
        }
        if (req.body.pass) {
            return authenticateModerator(req, res)
        }
    } catch (error) {
        return res.status(500).json({error: error.message, stackTrace: error.stack})
    }
    return res.status(400).json({error: "Payload provided is not valid."})
})

export default router
