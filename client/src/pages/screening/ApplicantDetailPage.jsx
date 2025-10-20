import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { applicants as applicantsApi } from '../../http/index.js'; // Pastikan path ini benar

// --- Import & Registrasi Chart.js ---
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// --- Komponen Bantuan (Helpers) ---

/**
 * Komponen untuk menampilkan Radar Chart yang bisa digunakan kembali.
 * @param {object} props - Props untuk komponen.
 * @param {string} props.title - Judul yang akan ditampilkan di atas chart.
 * @param {Array} props.scores - Array data skor skill.
 * @param {string} props.backgroundColor - Warna area dalam chart.
 * @param {string} props.borderColor - Warna garis chart.
 */
const RadarChart = ({ title, scores, backgroundColor, borderColor }) => {
  // Radar chart butuh minimal 3 titik untuk membentuk sebuah area.
  if (!scores || scores.length < 3) {
    return (
      <div className="p-4 border rounded-lg text-center bg-gray-50 h-full flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">Data tidak cukup untuk menampilkan chart.</p>
      </div>
    );
  }

  const chartData = {
    labels: scores.map(score => score.Skill.name),
    datasets: [
      {
        label: 'Skor',
        data: scores.map(score => score.score),
        backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.2)',
        borderColor: borderColor || 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 3,
        ticks: { stepSize: 1, backdropColor: 'transparent' },
        pointLabels: {
          font: { size: 11 },
          color: '#4A5568' // Warna abu-abu untuk label
        }
      },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{title}</h3>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

/**
 * Komponen untuk menampilkan baris detail (Label: Value).
 */
const DetailItem = ({ label, children }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200 first:border-t-0">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{children || '-'}</dd>
  </div>
);

// --- Komponen Halaman Utama ---

const ApplicantDetailPage = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await applicantsApi.getById(id);
        setApplicant(response.data);
      } catch (err) {
        setError('Gagal memuat data pelamar. Mungkin data tidak ditemukan atau terjadi kesalahan server.');
        console.error("Fetch detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10 font-semibold">Memuat detail pelamar...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  if (!applicant) {
    return null;
  }

  // --- Persiapan Data ---

  // Mengelompokkan skill berdasarkan kategori
  const skillScores = applicant.ApplicantScores || [];
  const skillsByCategory = skillScores.reduce((acc, score) => {
    const category = score.Skill.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(score);
    return acc;
  }, {});

  // Normalisasi data pendidikan untuk menangani variasi nama properti
  const educations = applicant.Educations || applicant.Education || applicant.educations || [];

  // Fungsi untuk membangun URL file statis dengan aman
  const makeUrl = (filePath) => {
    if (!filePath) return null;
    const backendUrl = (import.meta.env.VITE_BACKEND_URL).replace(/\/+$/, '');
    const path = filePath.replace(/^\/+/, '');
    return `${backendUrl}/${path}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/punya-skill-connect/applicants" className="text-indigo-600 hover:text-indigo-800 font-medium">
            &larr; Kembali ke Daftar Pelamar
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gray-50 border-b border-gray-200 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate">{applicant.fullName}</h1>
              <p className="mt-1 text-md text-gray-500">{applicant.email}</p>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <img className="h-44 w-36 rounded-lg object-cover ring-2 ring-white" src={makeUrl(applicant.photo)} alt="Foto Pelamar" />
            </div>
          </div>
          
          <div className="px-6 py-4">
            {/* Informasi Pribadi */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Identitas Diri</h2>
              <dl>
                <DetailItem label="Nama Panggilan">{applicant.nickName}</DetailItem>
                <DetailItem label="Jenis Kelamin">{applicant.gender}</DetailItem>
                <DetailItem label="Tanggal Lahir">{new Date(applicant.birthDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</DetailItem>
                <DetailItem label="Instagram/Tiktok"><a href={applicant.socialMedia} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{applicant.socialMedia}</a></DetailItem>
                <DetailItem label="LinkedIn"><a href={applicant.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{applicant.linkedin}</a></DetailItem>
                <DetailItem label="Whatsapp">{applicant.phone}</DetailItem>
                <DetailItem label="Provinsi">{applicant.province}</DetailItem>
                <DetailItem label="Kota">{applicant.city}</DetailItem>
                <DetailItem label="Alamat Sesuai KTP">{applicant.addressByKtp}</DetailItem>
                <DetailItem label="Alamat Domisili">{applicant.currentAddress}</DetailItem>
              </dl>
            </section>

            {/* Pendidikan */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pendidikan & Sertifikasi</h2>
              {educations.length > 0 ? (
                educations.map((edu) => (
                  <dl key={edu.id} className="mb-2 last:mb-0">
                    <DetailItem label="Pendidikan Terakhir">{edu.educationLevel}</DetailItem>
                    <DetailItem label="Asal Institusi/Lembaga">{edu.latestEducationalInstitution}</DetailItem>
                    <DetailItem label="Jurusan/Program Studi">{edu.major}</DetailItem>
                    <DetailItem label="Sertifikasi Kompetensi">{Array.isArray(edu.certificate) ? edu.certificate.join(', ') : edu.certificate}</DetailItem>
                  </dl>
                ))
              ) : <p className="text-sm text-gray-500">Belum ada data pendidikan.</p>}
            </section>

            {/* Pengalaman & Preferensi */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pengalaman & Preferensi</h2>
              {applicant.WorkExperiences?.map(work => (
                <dl key={work.id}>
                  <DetailItem label="Status Saat Ini">{work.currentStatus?.join(', ')}</DetailItem>
                  <DetailItem label="Pengalaman Kerja"><p className="whitespace-pre-wrap">{work.experiences}</p></DetailItem>
                </dl>
              ))}
              {educations.length > 0 ? (
                educations.map((edu) => (
                  <dl key={edu.id} className="mb-2 last:mb-0">
                    <DetailItem label="Kompetensi Hardskill (Technical)">{edu.hardskill}</DetailItem>
                  </dl>
                ))
              ) : <p className="text-sm text-gray-500">Belum ada data pendidikan.</p>}
                            {skillScores.length > 0 ? (
                <>
                  <div className="">
                    <RadarChart
                      title="Soft Skill (Behavioral)"
                      scores={skillsByCategory['Soft Skill (Behavioral)'] || []}
                      backgroundColor="rgba(75, 192, 192, 0.2)"
                      borderColor="rgba(75, 192, 192, 1)"
                    />
                    <RadarChart
                      title="Digital Skill"
                      scores={skillsByCategory['Digital Skill'] || []}
                      backgroundColor="rgba(255, 159, 64, 0.2)"
                      borderColor="rgba(255, 159, 64, 1)"
                    />
                    <RadarChart
                      title="Managerial/Leadership Skill"
                      scores={skillsByCategory['Managerial/Leadership Skill'] || []}
                      backgroundColor="rgba(153, 102, 255, 0.2)"
                      borderColor="rgba(153, 102, 255, 1)"
                    />
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500">Tidak ada data skor skill untuk ditampilkan.</p>
              )}
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pengalaman & Preferensi</h2>
              {applicant.WorkExperiences?.map(work => (
                <dl key={work.id}>
                  <DetailItem label="Jenis Pekerjaan yang Diinginkan">{work.jobType?.join(', ')}</DetailItem>
                  <DetailItem label="Bidang Industri yang Diminati">{work.jobField?.join(', ')}</DetailItem>
                  <DetailItem label="Lokasi/Bentuk Kerja yang Diinginkan">{work.preferredWorkLocations?.join(', ')}</DetailItem>
                  <DetailItem label="Kesiapan Waktu Kerja">{work.workReadiness}</DetailItem>
                  <DetailItem label="Ketersediaan Penempatan Diluar Kota">{work.willingToRelocate ? 'Ya' : 'Tidak'}</DetailItem>
                </dl>
              ))}
            </section>

            {/* Dokumen */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Dokumen</h2>
              {applicant.WorkExperiences?.[0] ? (
                <dl>
                  <DetailItem label="Pas Photo"><a href={makeUrl(applicant.photo)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Foto Potrait</a></DetailItem>
                  <DetailItem label="CV"><a href={makeUrl(applicant.WorkExperiences[0].cv)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat CV</a></DetailItem>
                  <DetailItem label="Portofolio"><a href={makeUrl(applicant.WorkExperiences[0].portofolio)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Portofolio</a></DetailItem>
                  <DetailItem label="Identitas"><a href={makeUrl(applicant.WorkExperiences[0].identity)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Identitas</a></DetailItem>
                </dl>
              ) : <p className="text-sm text-gray-500">Dokumen tidak ditemukan.</p>}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailPage;