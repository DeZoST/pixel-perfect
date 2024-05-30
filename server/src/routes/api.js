import express from "express"

const router = express.Router()

router.post("/test", (req, res) => {
    res.json({message: "Hello, World!"})
})

// vote route

// change waitingSentence route

// toggle pause route

// start game route

export default router
