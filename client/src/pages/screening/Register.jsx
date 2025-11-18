import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import psaImg from "../../assets/images/img-logo-PSA.png";

const LoginRecruiter = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "recruiter",
  });

  // Handler untuk memperbarui state form saat input berubah
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Validasi password
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus("Password dan konfirmasi password tidak sama!");
      setIsSubmitting(false);
      return;
    }

    // Validasi panjang password
    if (formData.password.length < 6) {
      setSubmitStatus("Password minimal 6 karakter!");
      setIsSubmitting(false);
      return;
    }

    try {
      // Kirim data tanpa confirmPassword
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);

      setSubmitStatus("Registrasi berhasil!");

      // Timeout sebelum navigasi untuk memberi waktu user melihat pesan sukses
      setTimeout(() => navigate("/punya-skill-connect/thank-you"), 800);
    } catch (error) {
      setSubmitStatus(error.message || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Container utama */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 items-center gap-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl text-center font-bold text-gray-800 mb-4">
            Selamat Datang di <br /> Punya Skill Connect
          </h1>
          <div className="w-[400px] h-28 overflow-hidden flex items-center justify-center">
            <img
              src={psaImg}
              alt="PSA Logo"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <div>
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto bg-white p-6 rounded mt-6"
            >
              {/* Tampilkan pesan status */}
              {submitStatus && (
                <p
                  className={`text-sm text-center mb-4 p-3 rounded ${
                    submitStatus.includes("berhasil")
                      ? "text-green-700 bg-green-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  {submitStatus}
                </p>
              )}

              {/* Input Nama */}
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Perusahaan
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nama Perusahaan"
                className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              {/* Input Email */}
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              {/* Input Password */}
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password (minimal 6 karakter)"
                className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              {/* Input Konfirmasi Password */}
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Konfirmasi Password"
                className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              {/* Tombol submit */}
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Daftar"}
              </button>

              {/* Link ke halaman login */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/punya-skill-connect/login")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login di sini
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 Punya Skill Academy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginRecruiter;