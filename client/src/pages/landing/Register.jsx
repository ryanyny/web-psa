import React, { useState } from "react";
import ImgPro from "../../assets/images/imgproo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    jenis_kelamin: "",
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
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log("✅ Berhasil daftar:", response.data);

      setSubmitStatus("success");
      setFormData({ name: "", jenis_kelamin:"", email: "", password: "" });

       //Simpan data user ke localStorage
    // localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(()=> {
        // navigate("/dashboard-user");
        navigate("/login");
      },1200);

      setTimeout(() => setSubmitStatus(""), 3000);
    } catch (error) {
      console.error("❌ Gagal daftar:", error.response?.data || error.message);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 overflow-hidden mt-16 pt-12 pb-24">
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
                      Ayo Registrasi!
                    </h2>
                    <p className="text-black text-sm lg:text-base">
                      Silahkan buat Akun Anda terlebih dahulu..
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-black font-medium text-sm lg:text-base"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="jenis_kelamin"
                        className="block text-black font-medium text-sm lg:text-base"
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        id="jenis_kelamin"
                        name="jenis_kelamin"
                        value={formData.jenis_kelamin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                        required
                      >
                        <option value="">Choose your gender</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>

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

                    {/* Button Register */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? "Loading..." : "Register"}
                    </button>

                    {/* Status */}
                    {submitStatus === "success" && (
                      <div className="text-green-600 text-center text-sm">
                        ✅ Register berhasil!
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="text-red-600 text-center text-sm">
                        ❌ Terjadi kesalahan. Coba lagi.
                      </div>
                    )}

                    {/* Link Login */}
                    <div className="text-center text-sm text-gray-700 mt-4">
                      Sudah punya akun?{" "}
                      <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Ayo login!
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
