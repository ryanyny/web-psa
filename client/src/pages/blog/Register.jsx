import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext.jsx"

const Register = () => {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await register({ name, email, password }) // Panggil fungsi register
      navigate("/");
    } catch {
      alert("Gagal daftar")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Daftar</h2>
      {/* Input name */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama pengguna"
        className="w-full p-2 border rounded mb-2"
        required />
      {/* Input email */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        required />
      {/* Input password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Kata Sandi"
        className="w-full p-2 border rounded mb-2"
        required />

      {/* Tombol submit */}
      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Daftar
      </button>
    </form>
  )
}

export default Register