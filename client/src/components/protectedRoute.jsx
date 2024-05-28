import {Navigate} from "react-router-dom"
import PropTypes from "prop-types"
import {useAuth} from "../hooks/useAuth"

export const ProtectedRoute = ({children}) => {
    const {user} = useAuth()
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
}
