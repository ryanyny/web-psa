import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  // Tampilkan pesan loading jika masih loading
  if (loading) return <div className="text-center p-8">Memuat...</div>
  // Arahkan ke halaman /login jika user belum login
  if (!user) return <Navigate to="/login" replace />

  // Render children jika sudah login
  return children
}

export default ProtectedRoute