import { Link } from "react-router-dom";

const ThankYou = () => {
    return ( 
        <div className="text-center p-10">
            <h2 className="text-2xl font-bold mb-4">
                Terima Kasih Sudah Mendaftar!
            </h2>
            <p>Anda Sudah Mengajukan Pendaftaran Sebagai Mitra, Mohon Tunggu Konfirmasi Email Dari Kami.</p>
            <Link
                to="/punya-skill-connect"
                className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded"
            >
                Kembali ke Halaman Utama
            </Link>
        </div>
    );
}

export default ThankYou;