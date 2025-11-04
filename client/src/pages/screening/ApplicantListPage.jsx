import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicants as applicantsApi } from '../../http/index';
import AuthContext from '../../context/AuthContext.jsx';

const ApplicantListPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await applicantsApi.getAll(); 
        setApplicants(response.data);
        setFilteredApplicants(response.data); // Initialize filtered applicants
      } catch (err) {
        setError('Gagal memuat data pelamar. Silakan coba lagi nanti.');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  // Effect untuk filter data berdasarkan search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredApplicants(applicants);
    } else {
      const filtered = applicants.filter(applicant =>
        applicant.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.alumni?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplicants(filtered);
    }
  }, [searchTerm, applicants]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Cari pelamar berdasarkan nama, email, telepon, atau alumni..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            Menampilkan {filteredApplicants.length} dari {applicants.length} pelamar
          </p>
        )}
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
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
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
                  <td colSpan="6" className="text-center py-10">
                    {searchTerm ? 'Tidak ada pelamar yang sesuai dengan pencarian.' : 'Tidak ada data pelamar.'}
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