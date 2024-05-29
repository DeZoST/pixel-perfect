import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
import httpRoutes from "./routes/api.js"
import authRoutes from "./routes/auth.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/api", httpRoutes)
app.use(authRoutes)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
