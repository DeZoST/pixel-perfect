import {createContext, useContext, useMemo} from "react"
import {useNavigate} from "react-router-dom"
import {useLocalStorage} from "./useLocalStorage"
import {jwtDecode} from "jwt-decode"
import PropTypes from "prop-types"
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("token", null)
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        navigate("/login", {replace: true})
    }

    const login = async data => {
        if (!data.jwt) {
            logout()
        }

        setUser(data)
        let decoded = jwtDecode(data.jwt)
        console.log(decoded)
        if (decoded.role == "moderator") {
            return navigate("/upload")
        }
        return navigate("/game")
    }

    const value = useMemo(() => {
        let decoded = null
        if (user && user.jwt) {
            decoded = jwtDecode(user.jwt)
        }

        return {
            user,
            role: decoded ? decoded.role : null,
            name: decoded ? decoded.name : null,
            id: decoded ? decoded.id : null,
            login,
            logout,
        }
    }, [user])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export const useAuth = () => {
    return useContext(AuthContext)
}
