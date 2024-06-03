import {openDb} from "../db/db.js"
global.gameTicker = null
global.gameTime = 10

export async function updateWaitingSentence(req, res) {
    try {
        const db = await openDb()
        await db.run("UPDATE GAME SET WAITING_SENTENCE = ?", req.body.sentence)
        return res.json({message: "Waiting sentence updated successfully!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function pause(req, res) {
    try {
        const db = await openDb()
        await db.run("UPDATE GAME SET IS_PAUSED = TRUE")
        return res.json({message: "Pause updated successfully!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function resume(req, res) {
    try {
        const db = await openDb()
        await db.run("UPDATE GAME SET IS_PAUSED = FALSE")
        startGameTicker()
        return res.json({message: "Game resumed!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function handleResetGame(req, res) {
    try {
        await resetGame()
        return res.json({message: "Game reset!"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error.message})
    }
}

export async function start(req, res) {
    try {
        await startGame()
        return res.json({message: "Game started!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

async function resetGame() {
    const db = await openDb()
    await db.run("UPDATE GAME SET IS_STARTED = FALSE")
    await db.run("UPDATE GAME SET IS_FINISHED = FALSE")
    await db.run("UPDATE GAME SET IS_PAUSED = FALSE")
    await db.run("UPDATE GAME SET SECONDS_REMAINING = " + global.gameTime)
    await db.run("UPDATE TEAM SET IS_VOTED = FALSE")
    await db.run("UPDATE GAME SET CURRENT_TEAM_ID = NULL")
    await db.run("DELETE FROM VOTE")
    clearInterval(global.gameTicker)
}

async function startGame() {
    const db = await openDb()
    const teams = await db.all("SELECT * FROM TEAM")
    for (const team of teams) {
        if (!team.HAS_VIDEO) {
            throw new Error(`${team.NAME} n'a pas de vidéo upload!`)
        }
    }
    await resetGame()
    await db.run("UPDATE GAME SET IS_STARTED = TRUE")
    selectTeamToVote()
    startGameTicker()
}

function startGameTicker() {
    if (global.gameTicker) {
        clearInterval(global.gameTicker)
    }
    global.gameTicker = setInterval(async () => {
        try {
            await updateGameTimer()
            global.emitter.emit("gameUpdated")
        } catch (error) {
            console.error("Error updating time:", error)
            clearInterval(global.gameTicker)
        }
    }, 1000) // Update every second
}

async function updateGameTimer() {
    const db = await openDb()
    const game = await db.get("SELECT * FROM GAME")
    if (game.IS_PAUSED) {
        clearInterval(global.gameTicker)
        return
    }
    if (game.SECONDS_REMAINING === 0) {
        await db.run("UPDATE TEAM SET IS_VOTED = TRUE WHERE ID = ?", game.CURRENT_TEAM_ID)
        await selectTeamToVote()
    }
    if (game.SECONDS_REMAINING > 0) {
        return await db.run("UPDATE GAME SET SECONDS_REMAINING = SECONDS_REMAINING - 1")
    }
    await db.run("UPDATE GAME SET SECONDS_REMAINING = " + global.gameTime)
}

async function selectTeamToVote() {
    const db = await openDb()
    const teams = await db.all("SELECT * FROM TEAM WHERE IS_VOTED = FALSE ORDER BY ID ASC")
    if (teams.length === 0) {
        await db.run("UPDATE GAME SET IS_FINISHED = TRUE")
        await db.run("UPDATE GAME SET IS_STARTED = FALSE")
        return clearInterval(global.gameTicker)
    }
    await db.run("UPDATE GAME SET CURRENT_TEAM_ID = ?", teams[0].ID)
}
