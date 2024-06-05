import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
import httpRoutes from "./routes/api.js"
import authRoutes from "./routes/auth.js"
import gameRoutes from "./routes/game.js"
import fs from "fs"
import {openDb} from "./db/db.js"
import {emitGameUpdatedMiddleware} from "./middlewares/gameUpdateEvent.js"
import http from "http"
import {Server} from "socket.io"
import {snakeToCamel} from "./utils.js"
import {isModeratorMiddleware} from "./middlewares/isModeratorMiddleware.js"
import {isUserMiddleware} from "./middlewares/isUserMiddleware.js"
import {authenticateWS} from "./controllers/authController.js"

const app = express()
const port = 3000
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    },
})

global.io = io

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads")
}

const db = await openDb()
await db.migrate({
    migrationsPath: "./src/db/migrations",
})

app.use("/uploads", express.static("uploads"))
app.use(cors())
app.use(express.json())
app.use("/api", isUserMiddleware, httpRoutes)
app.use("/api/game", isModeratorMiddleware, gameRoutes, emitGameUpdatedMiddleware)
app.use(authRoutes)
io.engine.on("connection_error", err => {
    console.log(err.message)
})
io.on("connection", async socket => {
    const token = await authenticateWS(socket)
    if (!token) {
        return socket.disconnect()
    }
    if (token.role === "moderator") {
        socket.join("moderators")
    }

    const db = await openDb()
    const game = await db.get("SELECT * FROM GAME")
    socket.emit("game.listen", snakeToCamel(game))
})

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
