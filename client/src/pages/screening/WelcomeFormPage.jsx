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

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-sm text-yellow-700">
                <span className="font-semibold">Tips:</span><br />Siapkan dokumen dan 
                informasi yang diperlukan sebelum mulai mengisi form sebagai berikut:
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                        Curriculum Vitae (CV)
                    </li>
                    <li>
                        Portofolio
                    </li>
                    <li>
                        Pas Photo
                    </li>
                    <li>
                        Data Diri
                    </li>
                </ul>
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Link 
                to="/skill-connect/form"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Lanjutkan ke Pendaftaran
            </Link>
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