import {useMutation} from "react-query"

export function useAuthMutation() {
    const mutation = useMutation(accessToken =>
        fetch("http://localhost:3000/auth", {
            // TODO : add to .env
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: accessToken}),
        }).then(res => res.json()),
    )

    return mutation
}

export function useModeratorAuthMutation() {
    const mutation = useMutation(async code => {
        const response = await fetch("http://localhost:3000/auth", {
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
