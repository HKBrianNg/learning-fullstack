import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children }) {
    let { user } = useAuth()
    if (!user) {
        return <Navigate to="/auth/logout" replace />
    }
    return children
}

export default ProtectedRoute
