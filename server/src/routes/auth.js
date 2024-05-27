import express from "express"
import {authenticateUser} from "../controllers/authController.js"

const router = express.Router()

router.get("/callback", async (req, res) => {
    try {
        const data = await authenticateUser(req)
        return res.json(data)
    } catch (error) {
        return res.status(500).json({error: error.message, stackTrace: error.stack})
    }
})

export default router
