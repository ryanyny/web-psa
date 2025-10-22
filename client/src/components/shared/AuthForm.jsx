export default function AuthForm({
    type = "login",
    onSubmit,
    isSubmitting,
    submitStatus,
    formData,
    onInputChange,
}) {
    const isLogin = type === "login"

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-6 text-left relative z-10"
            autoComplete="off"
        >
            {/* Field khusus untuk register */}
            {!isLogin && (
                <>
                    <div className="space-y-2">
                        {/* Nama lengkap */}
                        <label className="block text-black font-medium text-sm lg:text-base">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onInputChange}
                            placeholder="Masukkan nama Anda"
                            className="w-full px-4 py-4 bg-white/90 rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 transition-all duration-300"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        {/* Jenis kelamin */}
                        <label className="block text-black font-medium text-sm lg:text-base">
                            Jenis Kelamin
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={onInputChange}
                            className="w-full px-4 py-4 bg-white/90 rounded-xl border-0 text-gray-900 focus:ring-4 focus:ring-teal-400/50 transition-all duration-300"
                            required
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                </>
            )}
            
            {/* Field umum */}
            <div className="space-y-2">
                {/* Email */}
                <label className="block text-black font-medium text-sm lg:text-base">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                    placeholder="Masukkan email Anda"
                    className="w-full px-4 py-4 bg-white/90 rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 transition-all duration-300"
                    required
                />
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="block text-black font-medium text-sm lg:text-base">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onInputChange}
                    placeholder="Masukkan password Anda"
                    className="w-full px-4 py-4 bg-white/90 rounded-xl border-0 placeholder-gray-500 text-gray-900 focus:ring-4 focus:ring-teal-400/50 transition-all duration-300"
                    required
                />
            </div>

            {/* Tombol submit dengan animasi loading */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <div className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Loading...
                    </div>
                    // Teks tombol bergantung pada jenis form (login / register)
                    ) : isLogin ? ("Login") : ("Register")}
            </button>
            
            {/* Status submit (success / error message) */}
            {submitStatus && (
                <div
                    className={`text-center text-sm ${ submitStatus.includes("berhasil")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                >
                    {submitStatus}
                </div>
            )}
        </form>
    )
}