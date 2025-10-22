import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import AuthForm from "../../components/shared/AuthForm"
import ImgPro from "../../assets/images/imgproo.png"

export default function Login() {
  const navigate = useNavigate()
  const [submitStatus, setSubmitStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  
  const { login } = useContext(AuthContext)
  
  // Handler untuk memperbarui state form saat input berubah
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handler saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("")

    try {
      const userData = await login(formData)

      setSubmitStatus("Login berhasil!")

      // Timeout sebelum navigasi untuk memberi waktu user melihat pesan sukses
      setTimeout(() => {
        // Navigasi berdasarkan role user
        if (userData.role === "admin") navigate("/dashboard-admin"), { replace: true }
        else navigate("/dashboard-user"), { replace: true }
      }, 800)
    } catch (error) {
      setSubmitStatus(error.message || "Terjadi kesalahan. Coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 relative overflow-hidden py-12">
      {/* Styling latar belakang */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Bagian kiri: Gambar */}
        <div>
          <img src={ImgPro} alt="Logo" className="rounded-3xl" />
        </div>

        {/* Bagian kanan: Form login */}
        <div className="bg-black/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">Ayo Login!</h2>
            <p className="text-black text-sm">
              Silahkan masuk ke akun Anda terlebih dahulu
            </p>
          </div>

          <AuthForm
            type="login"
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            formData={formData}
            onInputChange={handleInputChange}
          />

          <div className="text-center text-sm text-gray-700 mt-4">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}