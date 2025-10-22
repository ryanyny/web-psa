import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext.jsx"

// Komponen HOC (Higher-Order-Component) untuk memproteksi rute dari user yang belum login
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  // Tampilkan status loading saat pemeriksaan autentikasi sedang berjalan
  if (loading) return <div className="text-center p-8">Loading...</div>
  // Jika pemeriksaan selesai dan tidak ada user, arahkan ke halaman login
  if (!user) return <Navigate to="/login" replace />
  // Jika user terautentikasi, tampilkan children (komponen yang diproteksi)
  
  return children
}

export default ProtectedRoute