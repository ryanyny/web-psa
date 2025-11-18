import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"
import Sidebar from "../components/shared/Sidebar.jsx"

export default function AdminLayout({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== "admin") return <Navigate to="/" replace />

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">{children}</main>
    </div>
  )
}