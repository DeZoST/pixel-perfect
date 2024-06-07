import {sendGameUpdates} from "../utils.js"

export async function emitGameUpdatedMiddleware(req, res) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
        await sendGameUpdates()
    }
}
