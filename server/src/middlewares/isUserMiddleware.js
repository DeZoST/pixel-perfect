import {decodeAndVerifyToken} from "../utils.js"

export async function isUserMiddleware(req, res, next) {
    // get bearer token from the request headers
    const bearer = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
    const token = await decodeAndVerifyToken(bearer)
    if (token && (token.role === "user" || token.role === "moderator")) {
        req.user = token
        return next()
    }
    return res.status(403).json({error: "Not authorized."})
}
