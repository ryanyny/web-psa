import psaImg from "../../assets/images/img-logo-PSA.png";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Container utama */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 items-center gap-8">
        <div className="flex justify-center mb-8">
            <div className="w-[700px] h-48 overflow-hidden flex items-center justify-center">
                <img
                    src={psaImg}
                    alt="PSA Logo"
                    className="object-cover object-center w-full h-full"
                />
            </div>
        </div>
        <div className="text-center md:text-left">
          {/* Sambutan */}
          <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-800 mb-4">
            Selamat Datang di Punya Skill Connect
          </h1>
          {/* Penjelasan */}
          <div className="space-y-4 mb-8 text-justify">
            <p className="text-gray-600 leading-relaxed">
                Punya Skill Connect adalah <b> platform talent matching yang menghubungkan alumni Punya Skill Academy dengan perusahaan/organisasi mitra.</b>
            </p>
            
            <p className="text-gray-600 leading-relaxed">
                Alumni yang telah dilatih hingga tersertifikasi bisa masuk ke dalam talent pool, kemudian direkomendasikan langsung ke 
                perusahaan yang membutuhkan tenaga kerja sesuai kompetensi mereka.
            </p>

            <p className="text-gray-600 leading-relaxed">
                Dengan Punya Skill Connect, <b> alumni Punya Skill Akademi tidak berhenti hanya di pelatihan, tapi mendapatkan akses peluang 
                kerja dengan mitra Punya Skill Akademi, baik itu pekerjaan full-time, freelance, magang, atau project, </b> kamu punya peluang lebih besar karena profilmu merupakan 
                alumni Punya Skill Akademi.
            </p>
          </div>
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
              Bergabunglah Bersama Kami
            </h2>
            
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
              {/* Button Alumni */}
              <Link
                to="/punya-skill-connect/form"
                className="group relative flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full md:w-auto"
              >
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-lg">Daftar Sebagai Alumni</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Divider */}
              <div className="hidden md:block text-gray-400 text-lg font-light">atau</div>

              {/* Button Mitra */}
              <Link
                to="/punya-skill-connect/register"
                className="group relative flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 w-full md:w-auto"
              >
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-lg">Daftar Sebagai Mitra</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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
}