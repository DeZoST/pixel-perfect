import {Navigate} from "react-router-dom"
import PropTypes from "prop-types"
import {useAuth} from "../hooks/useAuth"

export const ProtectedRoute = ({children, moderatorOnly}) => {
    const {user, role} = useAuth()
    if (!user || (moderatorOnly && role !== "moderator")) {
        return (window.location.href = "/login")
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
    moderatorOnly: PropTypes.bool,
}
