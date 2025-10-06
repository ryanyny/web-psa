import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext.jsx"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()

  // Fungsi logout
  const handleLogout = async () => {
    await logout()
    nav("/login")
  }


  return (
    <nav className="bg-white shadow">
      {/* Container navbar */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Bagian kiri */}
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">
            Web Blog
          </Link>
        </div>

        {/* Bagian kanan */}
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">
            Beranda
          </Link>

          {/* Tampilkan menu Tambah dan Postinganku jika user sudah login */}
          {user && (
            <Link to="/create" className="hover:underline">
              Tambah
            </Link>
          )}
          {user && (
            <Link to="/my-posts" className="hover:underline">
              Postinganku
            </Link>
          )}

          {/* Tampilkan tombol masuk & daftar jika user belum login  */}
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Daftar
              </Link>
            </>
          ) : (
            // Tampilkan juga nama & tombol Keluar
            <>
              <span className="px-3 py-1">Hai, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border rounded"
              >
                Keluar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar