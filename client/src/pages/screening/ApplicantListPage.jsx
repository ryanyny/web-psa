import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicants as applicantsApi } from '../../http/index'; // Pastikan path ini benar
import AuthContext from '../../context/AuthContext.jsx';

const ApplicantListPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        // Panggil fungsi getAll dari file http/index.js
        const response = await applicantsApi.getAll(); 
        setApplicants(response.data);
      } catch (err) {
        setError('Gagal memuat data pelamar. Silakan coba lagi nanti.');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali

  if (loading) {
    return <div className="text-center p-10">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Pelamar</h1>
        <div>
          <button
            onClick={async () => {
              await logout();
              navigate('/punya-skill-connect/login');
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                <th className="px-5 py-3 border-b-2 border-gray-200">Foto</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Nama Lengkap</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Email</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Nomor Telepon</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Alumni</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <img
                            className="h-20 w-16 rounded-lg object-cover"
                            src={`${import.meta.env.VITE_BACKEND_URL}/${applicant.photo}`}
                            alt="Foto Pelamar"
                        />
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{applicant.fullName}</p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{applicant.email}</p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{applicant.phone}</p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                       <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                          applicant.alumni === 'Project Based Learning' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-purple-100 text-purple-700'
                        }`}>
                        {applicant.alumni}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                      <Link
                        to={`/punya-skill-connect/applicants/${applicant.id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-semibold"
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    Tidak ada data pelamar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantListPage;