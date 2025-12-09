import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicants as applicantsApi } from '../../http/index.js';

const ApplicantListPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  }, []);

  const columnConfigDefault = [
    {
      key: "photo",
      label: "Foto",
      render: (applicant) => (
        <img
          className="h-20 w-16 rounded-lg object-cover"
          src={`${import.meta.env.VITE_BACKEND_URL}/${applicant.photo}`}
          alt="Foto Pelamar"
        />
      ),
    },
    {
      key: "fullName",
      label: "Nama Lengkap",
      render: (applicant) => applicant.fullName,
    },
    {
      key: "email",
      label: "Email",
      render: (applicant) => applicant.email,
    },
    {
      key: "action",
      label: "Aksi",
      render: (applicant) => (
        <Link
          to={`/punya-skill-connect/applicants/${applicant.id}`}
          className="text-indigo-600 hover:text-indigo-900 font-semibold"
        >
          Lihat Detail
        </Link>
      ),
    },
  ]

  const columnConfig = [
    {
      key: "photo",
      label: "Foto",
      render: (applicant) => (
        <img
          className="h-20 w-16 rounded-lg object-cover"
          src={`${import.meta.env.VITE_BACKEND_URL}/${applicant.photo}`}
          alt="Foto Pelamar"
        />
      ),
    },
    {
      key: "fullName",
      label: "Nama Lengkap",
      render: (applicant) => applicant.fullName,
    },
    {
      key: "email",
      label: "Email",
      render: (applicant) => applicant.email,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      render: (applicant) => applicant.gender,
    },
    {
      key: "province",
      label: "Provinsi",
      render: (applicant) => applicant.province,
    },
    {
      key: "city",
      label: "Kota",
      render: (applicant) => applicant.city,
    },
    {
      key: "educationLevel",
      label: "Pendidikan Terakhir",
      render: (applicant) => applicant?.Education?.[0]?.educationLevel ?? "-",
    },
    {
      key: "latestEducationalInstitution",
      label: "Asal Institusi Pendidikan",
      render: (applicant) => applicant?.Education?.[0]?.latestEducationalInstitution ?? "-",
    },
    {
      key: "phone",
      label: "Nomor Telepon",
      render: (applicant) => applicant.phone,
    },
    {
      key: "alumni",
      label: "Alumni",
      render: (applicant) => (
        <span
          className={`px-2 py-1 font-semibold leading-tight rounded-full ${
            applicant.alumni === "Project Based Learning"
              ? "bg-green-100 text-green-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {applicant.alumni}
        </span>
      ),
    },
    {
      key: "action",
      label: "Aksi",
      render: (applicant) => (
        <Link
          to={`/punya-skill-connect/applicants/${applicant.id}`}
          className="text-indigo-600 hover:text-indigo-900 font-semibold"
        >
          Lihat Detail
        </Link>
      ),
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState(() => {
    try {
      const raw = localStorage.getItem('applicant_table_columns')
      return raw ? JSON.parse(raw) : columnConfig.map(c => c.key)
    } catch (err) {
      console.error(err)
      return columnConfig.map(c => c.key)
    }
  });

  const [isColumnsOpen, setIsColumnsOpen] = useState(false);

  const toggleColumn = (key) => {
    const next = visibleColumns.includes(key)
      ? visibleColumns.filter(k => k !== key)
      : [...visibleColumns, key]
    setVisibleColumns(next)
    localStorage.setItem('applicant_table_columns', JSON.stringify(next))
  }

  const resetColumns = () => {
    const keys = columnConfigDefault.map(c => c.key)
    setVisibleColumns(keys)
    localStorage.removeItem('applicant_table_columns')
  }

  // Effect untuk filter data berdasarkan search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredApplicants(applicants);
    } else {
      const filtered = applicants.filter(applicant =>
        applicant.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.alumni?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (applicant.Educations && applicant.Educations.length > 0 && (
          applicant.Educations[0].educationLevel?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          applicant.Educations[0].latestEducationalInstitution?.toLowerCase()?.includes(searchTerm.toLowerCase())
        ))
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
        <div className="relative z-50">
          <button
            type="button"
            onClick={() => setIsColumnsOpen(!isColumnsOpen)}
            className="px-3 py-2 bg-gray-100 rounded-md border"
          >
            Columns
          </button>
          {isColumnsOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50 p-3">
              <div className="space-y-2">
                {columnConfig.map(col => (
                  <label key={col.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.key)}
                      onChange={() => toggleColumn(col.key)}
                    />
                    <span className="text-sm">{col.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex justify-between">
                <button onClick={resetColumns} className="text-sm text-blue-600">Reset</button>
                <button onClick={() => setIsColumnsOpen(false)} className="text-sm">Close</button>
              </div>
            </div>
          )}
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
            {/* Compute visible columns in the same order used for tbody */}
            {(() => {
              const visibleCols = columnConfig.filter(col => visibleColumns.includes(col.key))
              return (
                <thead>
                  <tr>
                    {visibleCols.map(col => (
                      <th key={col.key} className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-extrabold text-gray-600 uppercase">{col.label}</th>
                    ))}
                  </tr>
                </thead>
              )
            })()}
            <tbody>
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => {
                  return (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      {columnConfig
                        .filter((col) => visibleColumns.includes(col.key))
                        .map((col) => (
                          <td
                            key={col.key}
                            className="px-5 py-4 border-b border-gray-200 bg-white text-sm"
                          >
                            {col.render(applicant)}
                          </td>
                        ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columnConfig.filter(col => visibleColumns.includes(col.key)).length} className="text-center py-10">
                    {searchTerm
                      ? "Tidak ada pelamar yang sesuai dengan pencarian."
                      : "Tidak ada data pelamar."}
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