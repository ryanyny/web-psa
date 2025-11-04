import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Testimoni from "../landing/Testimoni";

export default function TestimoniAdmin() {
  const [Testimonis, setTestimoni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data testimoni
  const fetchTestimoni = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/api/testimoni");
      setTestimoni(res.data);
    } catch (err) {
      console.error("Gagal mengambil data testimoni:", err);
      alert("Gagal mengambil data testimoni");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  // Modal Detail
  const [selectedTestimoni, setSelectedTestimoni] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDetail = (testimoni) => {
    console.log("Detail data:", testimoni);
    setSelectedTestimoni(testimoni);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTestimoni(null);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus testimoni ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/testimoni/${id}`);
      setTestimoni((prevTestimoni) => prevTestimoni.filter((p) => p.id !== id));
      alert("Data testimoni berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus data testimoni:", err.message);
      alert("Terjadi kesalahan saat menghapus data testimoni.");
    }
  };
  // Format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

   const [editFormData, setEditFormData] = useState({
    status: "",
  });

  const [selectedTestimoniEdit, setSelectedTestimoniEdit] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (testimoni) => {
    setEditFormData({
      status: testimoni.status,
    });
    setEditId(testimoni.id);
    setSelectedTestimoniEdit(testimoni);
    setShowModalEdit(true);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
    setSelectedTestimoniEdit(null);
    setEditFormData({
      status: "",
    });
    setEditId(null);
  };

  // Handle Submit Edit - terpisah dari form tambah
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditSubmitting(true);

    try {
      const data = new FormData();
      data.append("status", editFormData.status);

      await axios.put(
        `http://localhost:5000/api/testimoni/edit/${editId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Status testimoni berhasil diubah");
      setShowModalEdit(false);
      fetchTestimoni();
    } catch (err) {
      console.error("Gagal edit status testimoni:", err);
      alert("Terjadi kesalahan saat mengubah status testimoni");
    } finally {
      setIsEditSubmitting(false);
    }
  };

  

  return (
    <div className="p-8">
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Management Testimoni
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Kelola dan pantau semua data testimoni yang mengikuti program
                PSA dengan mudah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Testimoni */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-10 py-8 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                Daftar Testimoni
              </h3>
              <p className="text-slate-600 font-medium">
                Kelola semua data testimoni
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">
              Memuat data testimoni...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                  <th className="border-0 px-8 py-6 font-black text-slate-700 text-lg">
                    Nama & Email
                  </th>
                  <th className="border-0 px-6 py-6 font-black text-slate-700 text-center text-lg">
                    Tanggal Testimoni
                  </th>
                  <th className="border-0 px-6 py-6 font-black text-slate-700 text-center text-lg">
                    Status
                  </th>
                  <th className="border-0 px-6 py-6 font-black text-slate-700 text-center text-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Testimonis.map((testimoni) => (
                  <tr
                    className="text-center hover:bg-blue-50/50 transition-all duration-300 group"
                    key={testimoni.id}
                  >
                    <td className="border-0 px-8 py-8">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                            {testimoni.nama_testimoni
                              ?.charAt(0)
                              ?.toUpperCase() || "P"}
                          </div>
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="font-bold text-slate-800 text-lg mb-1">
                            {testimoni.nama_testimoni}
                          </h4>
                          <p className="text-slate-500 text-sm font-medium">
                            {testimoni.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-0 px-6 py-8 text-slate-600 font-bold">
                      {formatDate(testimoni.created_at || new Date())}
                    </td>
                    <td className="border-0 px-6 py-8 text-slate-600 font-bold">
                      {testimoni.status}
                    </td>
                    <td className="border-0 px-6 py-8">
                      <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
                        <button
                          onClick={() => handleDetail(testimoni)}
                          type="button"
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 font-bold rounded-xl text-sm px-5 py-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                        >
                          <svg
                            className="w-4 h-4 mr-1 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>
                          Detail
                        </button>
                        <button
                        onClick={() => handleEdit(testimoni)}
                        type="button"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 font-bold rounded-xl text-sm px-5 py-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                      >
                        <svg
                          className="w-4 h-4 mr-1 inline"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                        Edit
                      </button>
                        <button
                          onClick={() => handleDelete(testimoni.id)}
                          type="button"
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 font-bold rounded-xl text-sm px-5 py-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                        >
                          <svg
                            className="w-4 h-4 mr-1 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {showModal && selectedTestimoni && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
              <h2 className="text-2xl font-bold">Detail Testimoni</h2>
              <button
                onClick={closeModal}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Foto + Nama + Email */}
              <div className="flex items-center space-x-4">
                {selectedTestimoni.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${selectedTestimoni.image}`}
                    alt={selectedTestimoni.nama_testimoni}
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A9 9 0 1118.88 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                )}

                <div>
                  <p className="text-lg font-semibold text-slate-800">
                    {selectedTestimoni.nama_testimoni}
                  </p>
                  <p className="text-slate-600">{selectedTestimoni.email}</p>
                </div>
              </div>

              {/* Testimoni */}
              <div>
                <label className="text-sm font-bold text-slate-600">
                  Testimoni
                </label>
                <p className="text-base text-slate-800 italic">
                  "{selectedTestimoni.testimoni}"
                </p>
              </div>

              {/* Tanggal */}
              <div>
                <label className="text-sm font-bold text-slate-600">
                  Tanggal Testimoni
                </label>
                <p className="text-base text-slate-800">
                  {formatDate(selectedTestimoni.created_at)}
                </p>
              </div>

              {/* Testimoni */}
              <div>
                <label className="text-sm font-bold text-slate-600">
                  Status
                </label>
                <p className="text-base text-slate-800 italic">
                  {selectedTestimoni.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {showModalEdit && selectedTestimoniEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transform scale-100 transition-all duration-300">
            {/* Header Modal Edit */}
            <div className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-700 px-8 py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Edit Status Testimoni
                    </h2>
                    <p className="text-green-100 font-medium">
                      Perbarui informasi testimoni
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModalEdit}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
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
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Edit Role */}
            <div className="p-8">
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Role */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-3 items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A7.5 7.5 0 0112 15.5a7.5 7.5 0 016.879 2.304M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Status Testimoni
                    </label>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditChange}
                      required
                      className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700"
                    >
                      <option value="" disabled>
                        -- Pilih --
                      </option>
                      <option value="ditolak">Di Tolak</option>
                      <option value="diterima">Di Terima</option>
                    </select>
                  </div>
                </div>

                {/* Tombol Submit */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={closeModalEdit}
                    className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isEditSubmitting}
                    className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-700 hover:from-emerald-600 hover:via-green-700 hover:to-teal-800 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
                  >
                    {isEditSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Menyimpan...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Simpan Perubahan
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
