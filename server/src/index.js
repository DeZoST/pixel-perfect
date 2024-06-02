import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
import httpRoutes from "./routes/api.js"
import authRoutes from "./routes/auth.js"
import gameRoutes from "./routes/game.js"
import fs from "fs"
import {openDb} from "./db/db.js"

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads")
}

const app = express()
const port = 3000

const db = await openDb()
await db.migrate({
    migrationsPath: "./src/db/migrations",
})

app.use(cors())
app.use(express.json())
// TODO protect api routes for users only
app.use("/api", httpRoutes)
// TODO protect game routes for moderator only
app.use("/api/game", gameRoutes)
app.use(cors(), authRoutes)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
