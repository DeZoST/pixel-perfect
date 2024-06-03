export function emitGameUpdatedMiddleware(req, res) {
    res.on("finish", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            global.emitter.emit("gameUpdated")
        }
    })
}
