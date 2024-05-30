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
        navigate("/user-game")
    }

    const decoded = jwtDecode(user.jwt)

    const value = useMemo(
        () => ({
            user,
            role: decoded.role,
            name: decoded.name,
            id: decoded.id,
            login,
            logout,
        }),
        [user],
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export const useAuth = () => {
    return useContext(AuthContext)
}
