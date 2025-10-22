import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import AuthForm from "../../components/shared/AuthForm"
import ImgPro from "../../assets/images/imgproo.png"

export default function Register() {
  const navigate = useNavigate()
  const [submitStatus, setSubmitStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
  })
  
  const { register } = useContext(AuthContext)

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
      await register(formData)

      setSubmitStatus("Register berhasil!")

      // Timeout sebelum navigasi untuk memberi waktu user melihat pesan sukses
      setTimeout(() => navigate("/dashboard-user"), 800)
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

        {/* Bagian kanan: Form register */}
        <div className="bg-black/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">
              Ayo Registrasi!
            </h2>
            <p className="text-black text-sm">
              Silahkan buat akun Anda terlebih dahulu
            </p>
          </div>

          <AuthForm
            type="register"
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            formData={formData}
            onInputChange={handleInputChange}
          />

          <div className="text-center text-sm text-gray-700 mt-4">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Ayo login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}