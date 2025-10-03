import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login({ email, password }) // Panggil fungsi login
      navigate("/")
    } catch {
      alert("Gagal masuk")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Masuk</h2>

      {/* Input email */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        required />
      {/* Input password */}
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Kata Sandi"
        className="w-full p-2 border rounded mb-2"
        required />

      {/* Tombol submit */}
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Masuk
      </button>
    </form>
  )
}

export default Login