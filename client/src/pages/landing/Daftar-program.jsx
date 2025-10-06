import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DaftarProgram() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/programs");
        setPrograms(res.data);
      } catch (err) {
        console.error("Gagal mengambil daftar program:", err);
      }
    };
    fetchPrograms();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tanggal_lahir: "",
    provinsi: "",
    kota_kabupaten: "",
    alamat: "",
    programId: "",
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
      // Mapping data sesuai dengan struktur API
      const dataToSend = {
        name_peserta: formData.name,
        email: formData.email,
        tanggal_lahir: formData.tanggal_lahir,
        provinsi: formData.provinsi,
        kota_kab: formData.kota_kabupaten,
        alamat: formData.alamat,
        program_id: formData.programId,
        status: "pending" // Default status
      };

      const response = await axios.post(
        "http://localhost:5000/api/peserta/add",
        dataToSend
      );

      if (response.status === 201) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          tanggal_lahir: "",
          provinsi: "",
          kota_kabupaten: "",
          alamat: "",
          programId: "",
        });
        setTimeout(() => setSubmitStatus(""), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Section - Full Width with proper spacing from navbar */}
      <div className="max-w-7xl mx-auto px-6 overflow-hidden mt-16 pt-12 pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-full filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-teal-600/25 to-green-600/25 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Geometric decorations */}
        <div className="absolute inset-0 opacity-12">
          <div className="absolute top-20 left-10 w-20 h-20 border border-white/20 rotate-45"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 border border-white/20 rotate-12"></div>
          <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border border-white/20 rotate-45"></div>
        </div>

        {/* Main content container - Full width like footer */}
        <div className="relative z-10 w-full">
          <div className="w-full px-8 py-12">
            <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 xl:gap-20 items-center">
              {/* Left Section - Hero Content */}
              <div className="space-y-8 text-black">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center">
                    Mari Bergabung
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-blue-700 animate-pulse">
                      Bersama PSA
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl xl:text-2xl text-black-300 text-center">
                    Daftar sekarang untuk pengalaman pelatihan yang
                    profesional!!
                  </p>
                </div>
              </div>

              {/* Right Section - Contact Form */}
              <div className="relative">
                {/* Form Card */}
                <div className="bg-black/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                  {/* Card decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-black mb-3">
                        Yuk, ikuti program kami!
                      </h2>
                      <p className="text-black-300 text-sm lg:text-base">
                        Silahkan daftar dibawah ini yaa..
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-black font-medium text-sm lg:text-base"
                        >
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap Anda"
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/* Email Input */}
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
                          placeholder="Masukkan email Anda"
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/*Tanggal Lahir */}
                      <div className="space-y-2">
                        <label
                          htmlFor="tanggal_lahir"
                          className="block text-black font-medium text-sm lg:text-base"
                        >
                          Tanggal Lahir
                        </label>
                        <input
                          type="date"
                          id="tanggal_lahir"
                          name="tanggal_lahir"
                          value={formData.tanggal_lahir}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/*Provinsi*/}
                      <div className="space-y-2">
                        <label
                          htmlFor="provinsi"
                          className="block text-black font-medium text-sm lg:text-base"
                        >
                          Provinsi
                        </label>
                        <input
                          type="text"
                          id="provinsi"
                          name="provinsi"
                          value={formData.provinsi}
                          onChange={handleInputChange}
                          placeholder="Masukkan Provinsi Anda"
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/*Kota/Kabupaten*/}
                      <div className="space-y-2">
                        <label
                          htmlFor="kota_kabupaten"
                          className="block text-black font-medium text-sm lg:text-base"
                        >
                          Kota / Kabupaten
                        </label>
                        <input
                          type="text"
                          id="kota_kabupaten"
                          name="kota_kabupaten"
                          value={formData.kota_kabupaten}
                          onChange={handleInputChange}
                          placeholder="Masukkan Kota atau Kabupaten Anda"
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/* Alamat Textarea */}
                      <div className="space-y-2">
                        <label
                          htmlFor="alamat"
                          className="block text-black font-medium text-sm lg:text-base"
                        >
                          Alamat Lengkap
                        </label>
                        <textarea
                          id="alamat"
                          name="alamat"
                          value={formData.alamat}
                          onChange={handleInputChange}
                          placeholder="Masukan alamat lengkap Anda"
                          rows={4}
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 resize-none text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/* Select program */}
                      <div className="space-y-2">
                        <label
                          htmlFor="programId"
                          className="block text-black font-medium text-sm lg:text-base"
                        >
                          Pilih Program
                        </label>
                        <select
                          id="programId"
                          name="programId"
                          value={formData.programId}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                        >
                          <option value="" disabled>
                            -- Pilih Program --
                          </option>
                          {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                              {program.nama_program}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Mendaftarkan...
                          </>
                        ) : (
                          <>
                            <span>Daftar Sekarang</span>
                            <svg
                              className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </>
                        )}
                      </button>

                      {/* Status Messages */}
                      {submitStatus === "success" && (
                        <div className="bg-green-500/20 border border-green-400/50 text-green-800 px-4 py-3 rounded-lg text-center text-sm lg:text-base">
                          ✅ Pendaftaran berhasil! Terima kasih telah mendaftar. Kami akan segera menghubungi Anda.
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="bg-red-500/20 border border-red-400/50 text-red-800 px-4 py-3 rounded-lg text-center text-sm lg:text-base">
                          ❌ Terjadi kesalahan saat mendaftar. Silakan periksa data Anda dan coba lagi.
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}