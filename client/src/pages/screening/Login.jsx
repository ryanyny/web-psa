import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx"; // Pastikan path ini benar
import psaImg from "../../assets/images/img-logo-PSA.png";

const LoginRecruiter = () => {
  // Ambil fungsi login dan status loading dari AuthContext
  const { login, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State untuk pesan error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error setiap kali submit

    try {
      // Panggil fungsi login dari context. Logikanya sudah terpusat di sana.
      const user = await login({ email, password });

      // Pastikan user yang login punya role recruiter
      if (user?.role === 'recruiter') {
        navigate("/punya-skill-connect/applicants");
      } else {
        setError('Akun tidak memiliki izin recruiter.');
      }

    } catch (err) {
      // Tangkap error yang dilempar dari fungsi login di context
      setError(err.message || "Email atau password salah. Silakan coba lagi.");
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

              {/* Tampilkan pesan error jika ada */}
              {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

              {/* Input email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500"
                required
              />
              {/* Input password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" // Placeholder diperbaiki
                className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Tombol submit */}
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading} // Tombol dinonaktifkan saat loading
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
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