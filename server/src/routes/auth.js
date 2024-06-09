import express from "express"
import {authenticateModerator, authenticateUser, getMicrosoftToken} from "../controllers/authController.js"

const router = express.Router()

router.get("/callback", async (req, res) => {
    try {
        return res.redirect(process.env.CLIENT_URL + "/login?access_token=" + (await getMicrosoftToken(req)))
    } catch (error) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=${error.message}`)
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
