import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(""), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 3000);
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
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
              {/* Left Section - Hero Content */}
              <div className="space-y-8 text-black">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    Mari Bergabung
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-blue-700 animate-pulse">
                      Bersama PSA
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl xl:text-2xl text-black-300 leading-relaxed max-w-2xl">
                    Ayo Hubungi Kami untuk infomasi lebih lengkapnya!
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                    <span>Hubungi kami</span>
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>

                {/* Features List */}
                <div className="space-y-6 pt-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-black mb-6">
                    Kenapa harus Punya Skill Academy?
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Pelatihan profesional berkualitas tinggi",
                      "Sertifikat yang diakui industri",
                      "Komunitas pembelajar yang aktif",
                      "Mentor berpengalaman",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 text-black-300"
                      >
                        <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"></div>
                        <span className="text-base lg:text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
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
                        Silahkan Cantumkan
                      </h2>
                      <p className="text-black-300 text-sm lg:text-base">
                        Pertanyaan atau saran kepada kami!
                      </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="blo  ck text-black font-medium text-sm lg:text-base"
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
                          placeholder="Enter your email"
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/* Message Textarea */}
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-black font-medium text-sm lg:text-base"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Enter your message"
                          rows={5}
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 focus:outline-none transition-all duration-300 resize-none text-sm lg:text-base"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
                            Sending...
                          </>
                        ) : (
                          <>
                            <span>Kirim Pesan</span>
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
                        <div className="bg-green-500/20 border border-green-400/50 text-green-300 px-4 py-3 rounded-lg text-center text-sm lg:text-base">
                          ✅ Pesan berhasil dikirim! Kami akan segera
                          menghubungi Anda.
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="bg-red-500/20 border border-red-400/50 text-red-300 px-4 py-3 rounded-lg text-center text-sm lg:text-base">
                          ❌ Terjadi kesalahan. Silakan coba lagi.
                        </div>
                      )}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <div className="grid grid-cols-1 gap-6">
                        {/* Instagram */}
                        <div className="flex items-center justify-center space-x-4 text-black/90">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-white/10">
                            <svg
                              className="w-5 h-5 text-pink-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5c3.072 0 5.75-2.678 5.75-5.75v-8.5C22 4.678 19.322 2 16.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold">Instagram</p>
                            <a
                              href="https://www.instagram.com/punyaskillakademi/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline"
                            >
                              @punyaskillakademi
                            </a>
                          </div>
                        </div>
                        {/* Email */}
                        <div className="flex items-center justify-center space-x-4 text-black/90">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-white/10">
                            <svg
                              className="w-5 h-5 text-teal-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold">Email</p>
                            <p className="text-sm text-black-300">
                              info@punyaskillakademi.co.id
                            </p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center justify-center space-x-4 text-black/90">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-white/10">
                            <svg
                              className="w-5 h-5 text-purple-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold">Lokasi</p>
                            <p className="text-sm text-black-300">
                              VOffice BYE, Jl. Terusan Jakarta No.404,
                              Sukamiskin, Kec. Arcamanik, Kota Bandung, Jawa
                              Barat 40291
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
