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

export default function DetailProgram() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/programs/${id}`
        );
        setProgram(response.data);
      } catch (error) {
        console.error("Gagal mengambil data program:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">
            Memuat data program...
          </p>
        </div>
      </div>
    );

  if (!program)
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
          <p className="text-red-500 text-lg">Program tidak ditemukan</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/program"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Program</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {program.nama_program}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {program.deskripsi}
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-6"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl">
              <img
                src={`http://localhost:5000/uploads/${program.image}`}
                alt={program.nama_program}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Program Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={<CheckCircle className="w-8 h-8 text-green-500" />}
            title="Sertifikat Resmi"
            description="Dapatkan sertifikat yang diakui industri setelah menyelesaikan program"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-purple-500" />}
            title="Mentor Berpengalaman"
            description="Belajar langsung dari praktisi dan ahli di bidangnya"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-4">Siap Bergabung?</h3>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Jangan lewatkan kesempatan emas ini! Daftarkan diri Anda sekarang
              dan mulai perjalanan belajar yang mengubah hidup.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/daftar-program"
                className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span className="font-medium">Daftar Sekarang</span>
              </Link>
              </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Garansi 30 Hari</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>1000+ Alumni</span>
              </div>
            </div>
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
