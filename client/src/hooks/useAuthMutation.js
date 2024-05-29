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
