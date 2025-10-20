import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext.jsx'

const ScreeningProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <div className="text-center p-8">Memuat...</div>

  // Jika belum login, arahkan ke screening login
  if (!user) return <Navigate to="/punya-skill-connect/login" replace />

  // Jika user login tapi bukan recruiter, tampilkan pesan akses ditolak
  if (user.role !== 'recruiter') {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Akses Ditolak</h2>
        <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    )
  }

  return children
}

export default ScreeningProtectedRoute
