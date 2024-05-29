import {createContext, useContext, useMemo} from "react"
import {useNavigate} from "react-router-dom"
import {useLocalStorage} from "./useLocalStorage"
import PropTypes from "prop-types"
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user", null)
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        navigate("/login", {replace: true})
    }

    const login = async data => {
        if (!data.name) {
            logout()
        }
        data.role = "user"

        setUser(data)
        navigate("/user-game")
    }

    const value = useMemo(
        () => ({
            user,
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
