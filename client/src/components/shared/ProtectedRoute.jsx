import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const ProtectedRoute = ({ children, role, redirectTo = "/login" }) => {
    const { user, loading } = useContext(AuthContext)

    // Saat masih loading
    if (loading) return <div className="text-center p-8">Loading...</div>

    // Jika belum login, redirect ke halaman login yang ditentukan
    if (!user) return <Navigate to={redirectTo} replace />

    // Cek role user
    if (role && user.role !== role) {
        return (
            <div className="p-8 max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-4">Akses Ditolak!</h2>
                <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            </div>
        )
    }

    return children
}

export default ProtectedRoute