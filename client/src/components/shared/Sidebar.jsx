import { useContext } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Home, LayoutDashboard, FolderKanban, Users, FileText, MessageCircle, HelpCircle, Notebook } from "lucide-react"
import AuthContext from "../../context/AuthContext.jsx"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useContext(AuthContext)

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard-admin",
      icon: <Home className="w-5 h-5 mr-3" />,
    },
    {
      label: "Dashboard Blog",
      path: "/blog/dashboard-admin",
      icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    },
    {
      label: "Program",
      path: "/program-admin",
      icon: <Notebook className="w-5 h-5 mr-3" />,
    },
    {
      label: "Mitra",
      path: "/mitra-admin",
      icon: <Users className="w-5 h-5 mr-3" />,
    },
    {
      label: "Data Peserta",
      path: "/peserta-admin",
      icon: <Users className="w-5 h-5 mr-3" />,
    },
    {
      label: "Data Testimoni",
      path: "/testimoni-admin",
      icon: <MessageCircle className="w-5 h-5 mr-3" />,
    },
    {
      label: "Data FAQ",
      path: "/FAQ-admin",
      icon: <HelpCircle className="w-5 h-5 mr-3" />,
    },
    {
      label: "Data Pengguna",
      path: "/blog/manage-users-admin",
      icon: <Users className="w-5 h-5 mr-3" />,
    },
    {
      label: "Data Postingan",
      path: "/blog/manage-posts-admin",
      icon: <FileText className="w-5 h-5 mr-3" />,
    },
  ]

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col shadow-xl z-50">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-center text-white">
          Admin <span className="text-blue-400">PSA</span>
        </h2>
      </div>

      <nav className="flex flex-col p-4 space-y-2 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white ${
              location.pathname === item.path
                ? "bg-blue-700 text-white"
                : "text-gray-300"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        <div className="mt-auto pt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-5v-1m-4 4a9 9 0 108 0" />
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}