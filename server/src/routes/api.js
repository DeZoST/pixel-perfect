import express from "express"

const router = express.Router()

router.post("/test", (req, res) => {
    res.json({message: "Hello, World!"})
})

export default router
