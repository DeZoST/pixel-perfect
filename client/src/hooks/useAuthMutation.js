import {useMutation} from "react-query"

export function useAuthMutation() {
    const mutation = useMutation(async accessToken => {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + "/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: accessToken}),
        })
        const data = await response.json()

        if (!data.jwt) {
            throw new Error(data.error || "Une erreur est survenue.")
        }

        return data
    })

    return mutation
}

export function useModeratorAuthMutation() {
    const mutation = useMutation(async code => {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + "/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({pass: code}),
        })

        const data = await response.json()

        if (!data.jwt) {
            throw new Error(data.error)
        }

        return data
    })

    return mutation
}
