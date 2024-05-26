import express from "express"

const router = express.Router()

router.get("/callback", async (req, res) => {
    const code = req.query.code
    const query = new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
        grant_type: "authorization_code",
    }).toString()

    const url = "https://login.microsoftonline.com/consumers/oauth2/v2.0/token"

    const resp = await fetch(url, {
        method: "POST",
        body: query,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    const data = await resp.json()
    console.log(data)
    res.json()
})

export default router
