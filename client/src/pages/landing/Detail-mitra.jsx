// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Clock, Users, Globe, Award, CheckCircle } from "lucide-react";

// export default function DetailMitra() {
//   const { id } = useParams();
//   const [mitra, setMitra] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMitra = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/mitra/${id}`);
//         setMitra(response.data);
//       } catch (error) {
//         console.error("Gagal mengambil data mitra:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMitra();
//   }, [id]);

//   if (loading) return <div className="text-center py-20 text-lg font-medium">Memuat data mitra...</div>;
//   if (!mitra) return <div className="text-center py-20 text-red-500">Mitra tidak ditemukan</div>;

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       {/* Judul dan Gambar */}
//       <div className="grid md:grid-cols-2 gap-8 items-start">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">{mitra.nama_mitra}</h1>
//           <p className="text-gray-600 mb-6 leading-relaxed">{mitra.deskripsi}</p>
//         </div>

//         {/* Gambar mitra */}
//         <div>
//           <img
//             src={`http://localhost:5000/uploads/${mitra.image}`}
//             alt={mitra.nama_mitra}
//             className="w-full h-auto rounded-xl shadow-md object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  Users,
  Globe,
  Award,
  CheckCircle,
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DetailMitra() {
  const { id } = useParams();
  const [mitra, setMitra] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMitra = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/mitra/${id}`
        );
        setMitra(response.data);
      } catch (error) {
        console.error("Gagal mengambil data mitra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMitra();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">
            Memuat data mitra...
          </p>
        </div>
      </div>
    );

  if (!mitra)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-500 text-lg">Data mitra tidak ditemukan</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/mitra"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Mitra</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {mitra.nama_mitra}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {mitra.deskripsi}
            </p>

            <p className="text-xl text-gray-600 leading-relaxed">
              {mitra.alamat_mitra}
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-6"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl">
              <img
                src={`http://localhost:5000/uploads/${mitra.image}`}
                alt={mitra.nama_mitra}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-4">
              Gabung, Berkembang, dan Sukses Bersama!{" "}
            </h3>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Kami mengajak Anda untuk menjadi mitra dalam perjalanan menuju
              peluang tanpa batas.{" "}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 space-x-4 hover:shadow-xl transition-shadow duration-300">
      <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-500 font-medium">{title}</div>
        <div className="font-bold text-gray-900 text-lg">{value}</div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function DetailCard({ icon, title, value, subtitle }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="font-bold text-lg text-gray-800 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
