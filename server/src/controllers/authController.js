import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"
export async function authenticateUser(req) {
    const {uhs, xblToken} = await getXboxLiveToken(req.body.token)
    const xblXTSToken = await getXboxLiveXSTS(uhs, xblToken)
    const mojangToken = await getMojangToken(uhs, xblXTSToken)
    const mojangProfile = await getMojangProfile(mojangToken)

    const privateKey = fs.readFileSync(path.resolve(process.cwd(), "./RS256.key"))
    const token = jwt.sign({id: mojangProfile.id, name: mojangProfile.name, role: "user"}, privateKey, {
        algorithm: "RS256",
    })

    return {jwt: token}
}

export function authenticateModerator(req, res) {
    if (req.body.pass !== process.env.MODERATOR_PASS) {
        return res.status(401).json({error: "Unauthorized."})
    }
    const privateKey = fs.readFileSync(path.resolve(process.cwd(), "./RS256.key"))
    const token = jwt.sign({id: 1, name: "Modérateur", role: "moderator"}, privateKey, {
        algorithm: "RS256",
    })

    return res.json({jwt: token})
}

export async function getMicrosoftToken(req) {
    if (!req.query.code) throw new Error("No code provided.")
    const query = new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
        grant_type: "authorization_code",
    }).toString()

    const microsoft = await fetch("https://login.live.com/oauth20_token.srf", {
        method: "POST",
        body: query,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    const data = await microsoft.json()
    if (!data.access_token) throw new Error("Microsoft token not found. Something went wrong.")

    return data.access_token
}

async function getXboxLiveToken(microsoftToken) {
    const xbx = await fetch("https://user.auth.xboxlive.com/user/authenticate", {
        method: "POST",
        body: JSON.stringify({
            RelyingParty: "http://auth.xboxlive.com",
            TokenType: "JWT",
            Properties: {
                AuthMethod: "RPS",
                SiteName: "user.auth.xboxlive.com",
                RpsTicket: "d=" + microsoftToken,
            },
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    const data = await xbx.json()
    const uhs = data.DisplayClaims.xui[0].uhs
    const xblToken = data.Token

    return {uhs, xblToken}
}

async function getXboxLiveXSTS(uhs, xblToken) {
    const xblSTS = await fetch("https://xsts.auth.xboxlive.com/xsts/authorize", {
        method: "POST",
        body: JSON.stringify({
            RelyingParty: "rp://api.minecraftservices.com/",
            TokenType: "JWT",
            Properties: {
                UserTokens: [xblToken],
                SandboxId: "RETAIL",
            },
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    const data = await xblSTS.json()
    if (data.XErr) {
        throw new Error("Aucun compte mojang n'est associé à ce compte Microsoft.")
    }
    return data.Token
}

async function getMojangToken(uhs, xblXTSToken) {
    const mojang = await fetch("https://api.minecraftservices.com/authentication/login_with_xbox", {
        method: "POST",
        body: JSON.stringify({
            identityToken: `XBL3.0 x=${uhs};${xblXTSToken}`,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const mojangData = await mojang.json()

    return mojangData.access_token
}

async function getMojangProfile(mojangToken) {
    const profile = await fetch("https://api.minecraftservices.com/minecraft/profile", {
        headers: {
            Authorization: `Bearer ${mojangToken}`,
        },
    })
    const profileData = await profile.json()

    return profileData
}
