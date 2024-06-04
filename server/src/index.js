import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
import httpRoutes from "./routes/api.js"
import authRoutes from "./routes/auth.js"
import gameRoutes from "./routes/game.js"
import fs from "fs"
import {openDb} from "./db/db.js"
import EventEmitter from "events"
import {emitGameUpdatedMiddleware} from "./middlewares/gameUpdateEvent.js"
import http from "http"
import {Server} from "socket.io"
import {snakeToCamel} from "./utils.js"
import {initializeWebSocket} from "./routes/websocket.js"

const app = express()
const port = 3000
const server = http.createServer(app)
initializeWebSocket(server)

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads")
}

global.emitter = new EventEmitter()

const db = await openDb()
await db.migrate({
    migrationsPath: "./src/db/migrations",
})

app.use(cors())
app.use(express.json())
// TODO protect api routes for users only
app.use("/api", httpRoutes)
// TODO protect game routes for moderator only
app.use("/api/game", gameRoutes, emitGameUpdatedMiddleware)
app.use(cors(), authRoutes)

global.emitter.on("gameUpdated", async () => {
    const db = await openDb()
    const game = await db.get("SELECT * FROM GAME")
    io.emit("game.listen", snakeToCamel(game))
})

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
