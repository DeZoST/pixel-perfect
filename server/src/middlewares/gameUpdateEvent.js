import {sendGameUpdates} from "../utils.js"

export function emitGameUpdatedMiddleware(req, res) {
    res.on("finish", async () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            await sendGameUpdates()
        }
    })
}
