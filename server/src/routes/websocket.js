/* empty for the moment



gameState route :
{
    isStarted: false,
    isFinished: false,
    isPaused: false,
    secondsRemaining: 0,
    currentTeam: ?,
    waitingSentence: "",
    IF ITS A MODERATOR : 
    currentPoints:{
        red: 0,
        pink: 0,
        lime: 0,
        green: 0,
        blue: 0,
        yellow: 0,
    }
}

leaderboard route :
[
    team: ?,
    teamNumber: ?,
    rank: ?,
    points: ?,
    wools: {
        red: ?,
        pink: ?,
        lime: ?,
        green: ?,
        blue: ?,
        yellow: ?,
    }

]

*/

import {Server as SocketIOServer} from "socket.io"
import {openDb} from "../db/db.js"

export const initializeWebSocket = server => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "*",
        },
    })

    io.on("connection", socket => {
        console.log("Client connected")

        socket.on("updateWaitingSentence", async data => {
            if (!data.message || !data.message.trim()) {
                console.error("Invalid message provided")
                return
            }

            try {
                const db = await openDb()
                await db.run("UPDATE GAME SET WAITING_SENTENCE = ?", data.message)
                io.emit("waitingSentenceUpdated", data.message)
            } catch (error) {
                console.error("Error updating waiting sentence:", error)
            }
        })

        socket.on("connection", async socket => {
            const db = await openDb()
            const game = await db.get("SELECT * FROM GAME")
            socket.emit("game.listen", snakeToCamel(game))
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected")
        })
    })

    console.log("WebSocket server is running")
}
