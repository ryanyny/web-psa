export default function Footer() {
  return (
    <footer className="w-screen bg-gray-900 text-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Grid dengan 4 kolom tetap - posisi selalu konsisten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Kolom 1 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Punya Skill Akademi</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Platform pendidikan dan pelatihan profesional yang berfokus pada
              peningkatan keterampilan generasi muda untuk siap kerja dan
              membangun usaha.
            </p>
            <div className="text-sm text-gray-400">
              <p className="mb-2">Di bawah naungan:</p>
              <p className="font-semibold text-white">
                Yayasan Sinergi Aksi Peduli
              </p>
            </div>
          </div>

          {/* Quick Links - Kolom 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Menu Utama</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/tentangkami"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Program Pelatihan
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* KOSONG - Kolom 3*/}
          <div className="hidden lg:block">
            {/* Kolom ini sengaja kosong tapi tetap ada untuk menjaga grid structure */}
          </div>

          {/* Contact & Newsletter - Kolom 4 (posisi tetap) */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hubungi Kami</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-gray-400">
                  <p>
                    VOffice BYE, Jl. Terusan Jakarta No.404, Sukamiskin, Kec.
                    Arcamanik
                  </p>
                  <p>Kota Bandung, Jawa Barat 40291</p>
                </div>
              </div>
              {/* <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-blue-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-400">+62 812-3456-7890</span>
              </div> */}
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-blue-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-400">
                  info@punyaskillakademi.com
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <p className="text-sm text-gray-400 mb-4">
                Dapatkan update program terbaru dan tips karier
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 Punya Skill Akademi Rights Reserved.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-400 mr-4">Ikuti Kami:</p>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.414-5.997 1.414-5.997s-.362-.72-.362-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-50"
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
}

/* Alternative Version - Tanpa kolom kosong, tapi Contact pindah ke kanan */
export function FooterAlternative() {
  return (
    <footer className="w-screen bg-gray-900 text-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Grid 3 kolom - Contact & Newsletter tetap di kanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>{/* Content sama seperti sebelumnya */}</div>

          {/* Quick Links */}
          <div>{/* Content sama seperti sebelumnya */}</div>

          {/* Contact & Newsletter - Selalu di kolom terakhir */}
          <div>{/* Content Contact & Newsletter */}</div>
        </div>
      </div>
    </footer>
  );
}

/* Alternative Version - Explicit Grid Positioning */
export function FooterExplicitGrid() {
  return (
    <footer className="w-screen bg-gray-900 text-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Grid dengan explicit column positioning */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info - Grid Column 1 */}
          <div className="lg:col-start-1 lg:col-end-2">
            {/* Content Company Info */}
          </div>

          {/* Quick Links - Grid Column 2 */}
          <div className="lg:col-start-2 lg:col-end-3">
            {/* Content Quick Links */}
          </div>

          {/* Contact & Newsletter - SELALU di Grid Column 4 */}
          <div className="lg:col-start-4 lg:col-end-5 md:col-start-2 md:col-end-3">
            {/* Content Contact & Newsletter */}
          </div>
        </div>
      </div>
      {/* Rest of footer... */}
    </footer>
  );
}
