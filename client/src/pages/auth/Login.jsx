import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ImgPro from "../../assets/images/imgproo.png";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await login(formData);
      
      setSubmitStatus("success");
      
      // Redirect berdasarkan role
      if (response.data.user.role === "admin") {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard-user");
      }
    } catch (error) {
      console.error("Login error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 relative overflow-hidden py-12">
      {/* Background animasi */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      {/* Konten utama */}
      <div className="relative z-10 w-full">
        <div className="w-full px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="space-y-8 text-black">
              <img src={ImgPro} alt="Logo" className="rounded-3xl" />
            </div>

            {/* Right Form */}
            <div className="relative">
              <div className="bg-black/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-black mb-3">
                      Ayo Login!
                    </h2>
                    <p className="text-black text-sm lg:text-base">
                      Silahkan masuk ke akun Anda terlebih dahulu
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-black font-medium text-sm lg:text-base"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-4 bg-white/90 rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="block text-black font-medium text-sm lg:text-base"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full px-4 py-4 bg-white/90 rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                        required
                      />
                    </div>

                    {/* Button Login */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? "Loading..." : "Login"}
                    </button>

                    {/* Status */}
                    {submitStatus === "success" && (
                      <div className="text-green-600 text-center text-sm">
                        Login berhasil!
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="text-red-600 text-center text-sm">
                        Email atau password salah. Coba lagi.
                      </div>
                    )}

                    {/* Link Register */}
                    <div className="text-center text-sm text-gray-700 mt-4">
                      Belum punya akun?{" "}
                      <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Daftar di sini
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}