import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

export default function MitraAdmin() {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    nama_mitra: "",
    deskripsi: "",
    alamat_mitra: "",
    image: "",
  });

  const [mitras, setMitras] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchMitras = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mitra");
      setMitras(res.data);
    } catch (err) {
      console.error("Gagal mengambil data mitra:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("nama_mitra", formData.nama_mitra);
      data.append("deskripsi", formData.deskripsi);
      data.append("alamat_mitra", formData.alamat_mitra);
      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.post("http://localhost:5000/api/mitra/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Data mitra berhasil ditambahkan");

      // Reset form
      setFormData({
        nama_mitra: "",
        deskripsi: "",
        alamat_mitra: "",
        image: "",
        status: "",
      });
      fetchMitras();
    } catch (err) {
      console.error("Gagal submit mitra:", err);
      alert("Terjadi kesalahan saat menyimpan data mitra");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    fetchMitras();
  }, []);

  //modal detail
  const [selectedMitra, setSelectedMitra] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDetail = (mitra) => {
    setSelectedMitra(mitra);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMitra(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data mitra ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/mitra/${id}`);

      // Hapus mitra dari state
      setMitras((prevMitras) => prevMitras.filter((mitra) => mitra.id !== id));

      alert("Data mitra berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus data mitra:", err.message);
      alert("Terjadi kesalahan saat menghapus data mitra.");
    }
  };

  // Modal Edit - State terpisah
  const [editFormData, setEditFormData] = useState({
    nama_mitra: "",
    deskripsi: "",
    image: "",
    alamat_mitra: "",
    status: "",
    oldImage: "",
  });
  const [selectedMitraEdit, setSelectedMitraEdit] = useState(null);
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

  const handleEdit = (mitra) => {
    setEditFormData({
      nama_mitra: mitra.nama_mitra,
      deskripsi: mitra.deskripsi,
      image: "",
      alamat_mitra: mitra.alamat_mitra,
      status:
        mitra.status?.toLowerCase() === "tidak aktif" ? "Tidak Aktif" : "Aktif",
      oldImage: mitra.image,
    });
    setEditId(mitra.id);
    setSelectedMitraEdit(mitra);
    setShowModalEdit(true);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
    setSelectedMitraEdit(null);
    setEditFormData({
      nama_mitra: "",
      deskripsi: "",
      image: "",
      alamat_mitra: "",
      status: "",
      oldImage: "",
    });
    setEditId(null);
  };

  // Handle Submit Edit - terpisah dari form tambah
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditSubmitting(true);

    try {
      const data = new FormData();
      data.append("nama_mitra", editFormData.nama_mitra);
      data.append("deskripsi", editFormData.deskripsi);
      data.append("alamat_mitra", editFormData.alamat_mitra);
      data.append("status", editFormData.status);

      if (editFormData.image) {
        data.append("image", editFormData.image);
      }

      await axios.put(`http://localhost:5000/api/mitra/edit/${editId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Data mitra berhasil diubah");
      setShowModalEdit(false);
      fetchMitras();
    } catch (err) {
      console.error("Gagal edit mitra:", err);
      alert("Terjadi kesalahan saat mengubah data mitra");
    } finally {
      setIsEditSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      {/* Header dengan glassmorphism effect */}
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mitra Management
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Kelola dan pantau semua mitra dengan mudah
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>{mitras.length} Mitra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-8 py-10">
        {/* Form Section dengan modern design */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 mb-10 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-10 py-8">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-indigo-100 font-medium">
                  Isi formulir di bawah untuk menambahkan data mitra baru
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Nama Mitra */}
              <div className="lg:col-span-2">
                <p className="block text-sm font-bold text-slate-700 mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                  Nama Mitra:
                </p>
                <input
                  type="text"
                  name="nama_mitra"
                  value={formData.nama_mitra}
                  onChange={handleChange}
                  placeholder="Nama Mitra"
                  required
                  className="w-full border-2 border-slate-200 px-6 py-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 hover:border-slate-300"
                />
              </div>

              {/* Deskripsi */}
              <div className="lg:col-span-2">
                <p className="block text-sm font-bold text-slate-700 mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    ></path>
                  </svg>
                  Deskripsi Mitra:
                </p>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Deskripsi Mitra"
                  required
                  rows="4"
                  className="w-full border-2 border-slate-200 px-6 py-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 hover:border-slate-300 resize-none"
                />
              </div>

              {/* Cover Mitra */}
              <div>
                <p className="block text-sm font-bold text-slate-700 mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Cover Mitra:
                </p>
                <div className="relative group">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        image: e.target.files[0],
                      }))
                    }
                    required
                    className="w-full border-2 border-dashed border-slate-300 px-6 py-8 rounded-2xl text-center bg-slate-50/50 hover:border-blue-400 transition-all duration-300 cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white hover:file:shadow-lg group-hover:bg-blue-50/50"
                  />
                </div>
              </div>

              {/* Alamat Mitra */}
              <div>
                <p className="block text-sm font-bold text-slate-700 mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Alamat Mitra :
                </p>
                <input
                  type="text"
                  name="alamat_mitra"
                  value={formData.alamat_mitra}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-slate-200 px-6 py-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 hover:border-slate-300"
                />
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-2 flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Mengirim...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      Tambah Mitra
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* TABEL dengan modern card-style */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-10 py-8 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">
                  Daftar Mitra
                </h3>
                <p className="text-slate-600 font-medium">
                  Kelola semua mitra yang telah dibuat
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-slate-600">
                  {mitras.filter((p) => p.status === "aktif").length} Aktif
                </span>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-sm font-bold text-slate-600">
                  {mitras.filter((p) => p.status === "tidak aktif").length}{" "}
                  Tidak Aktif
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                  <th className="border-0 px-8 py-6 font-black text-slate-700 text-lg">
                    Nama Mitra
                  </th>
                  <th className="border-0 px-6 py-6 font-black text-slate-700 text-center text-lg">
                    Status
                  </th>
                  <th className="border-0 px-6 py-6 font-black text-slate-700 text-center text-lg">
                    Dibuat
                  </th>
                  <th className="border-0 px-6 py-6 font-black text-slate-700 text-center text-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mitras.map((mitra) => (
                  <tr
                    className="text-center hover:bg-blue-50/50 transition-all duration-300 group"
                    key={mitra.id}
                  >
                    <td className="border-0 px-8 py-8">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                            {mitra.nama_mitra.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                mitra.status === "aktif"
                                  ? "bg-green-400"
                                  : "bg-red-400"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="font-bold text-slate-800 text-lg mb-1">
                            {mitra.nama_mitra}
                          </h4>
                          <p className="text-slate-500 text-sm font-medium truncate max-w-md">
                            {mitra.deskripsi}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-0 px-6 py-8">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-lg ${
                          mitra.status === "aktif"
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-red-400 to-rose-500 text-white"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            mitra.status === "aktif"
                              ? "bg-white animate-pulse"
                              : "bg-white"
                          }`}
                        ></div>
                        {mitra.status}
                      </span>
                    </td>
                    <td className="border-0 px-6 py-8 text-slate-600 font-bold">
                      {new Date(mitra.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="border-0 px-6 py-8">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleDetail(mitra)}
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
                          onClick={() => handleEdit(mitra)}
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
                          onClick={() => handleDelete(mitra.id)}
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
        </div>

        {/*modal detail */}
        {showModal && selectedMitra && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-white/30">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-10 py-8 rounded-t-3xl">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-1">
                        Detail Mitra
                      </h3>
                      <p className="text-indigo-100 font-medium">
                        Informasi lengkap Mitra
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white/80 hover:text-white hover:bg-white/20 p-3 rounded-2xl transition-all duration-300 hover:rotate-90"
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
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Konten 2 kolom */}
              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Kolom kiri: Tabel Informasi */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg border border-slate-200">
                      <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        Informasi Mitra
                      </h4>
                      <div className="space-y-5">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                            Nama Mitra
                          </label>
                          <p className="text-slate-900 font-bold text-lg mt-1">
                            {selectedMitra.nama_mitra}
                          </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                            Deskripsi
                          </label>
                          <p className="text-slate-900 font-bold text-lg mt-1">
                            {selectedMitra.deskripsi}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-l-4 border-green-500 pl-4">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                              Alamat
                            </label>
                            <p className="text-slate-900 font-bold mt-1">
                              {selectedMitra.alamat_mitra}
                            </p>
                          </div>
                          <div className="border-l-4 border-orange-500 pl-4">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                              Status
                            </label>
                            <div className="mt-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-xl text-sm font-bold ${
                                  selectedMitra.status === "aktif"
                                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                                    : "bg-gradient-to-r from-red-400 to-rose-500 text-white"
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full mr-2 ${
                                    selectedMitra.status === "aktif"
                                      ? "bg-white animate-pulse"
                                      : "bg-white"
                                  }`}
                                ></div>
                                {selectedMitra.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="border-l-4 border-indigo-500 pl-4">
                          <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                            Dibuat
                          </label>
                          <p className="text-slate-900 font-bold mt-1">
                            {new Date(
                              selectedMitra.created_at
                            ).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kolom kanan: Gambar */}
                  <div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 h-full flex items-center justify-center shadow-lg border border-slate-200">
                      {selectedMitra.image ? (
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                          <div className="relative">
                            <img
                              src={`http://localhost:5000/uploads/${selectedMitra.image}`}
                              alt={selectedMitra.nama_mitra}
                              className="w-full h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl p-16 mb-6">
                            <svg
                              className="mx-auto h-20 w-20 text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                          </div>
                          <p className="text-slate-500 font-bold text-lg">
                            Tidak ada gambar
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit */}
        {showModalEdit && selectedMitraEdit && (
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
                        Edit Mitra
                      </h2>
                      <p className="text-green-100 font-medium">
                        Perbarui Informasi Mitra
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

              {/* Form Edit */}
              <div className="p-8">
                <form onSubmit={handleEditSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Nama mitra */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
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
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          ></path>
                        </svg>
                        Nama Mitra
                      </label>
                      <input
                        type="text"
                        name="nama_mitra"
                        value={editFormData.nama_mitra}
                        onChange={handleEditChange}
                        placeholder="Masukkan nama mitra"
                        required
                        className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700"
                      />
                    </div>

                    {/* Deskripsi */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
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
                            d="M4 6h16M4 12h16M4 18h7"
                          ></path>
                        </svg>
                        Deskripsi Mitra
                      </label>
                      <textarea
                        name="deskripsi"
                        value={editFormData.deskripsi}
                        onChange={handleEditChange}
                        placeholder="Masukkan Deskripsi Mitra"
                        required
                        rows="4"
                        className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 resize-none"
                      />
                    </div>

                    {/* Alamat Mitra */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
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
                            d="M4 6h16M4 12h16M4 18h7"
                          ></path>
                        </svg>
                        Alamat Mitra
                      </label>
                      <textarea
                        name="alamat_mitra"
                        value={editFormData.alamat_mitra}
                        onChange={handleEditChange}
                        placeholder="Masukkan Alamat Mitra"
                        required
                        rows="4"
                        className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 resize-none"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        Status Mitra
                      </label>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditChange}
                        required
                        className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700"
                      >
                        <option value="" disabled>
                          -- Pilih Status --
                        </option>
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                      </select>
                    </div>

                    {/* Gambar Lama */}
                    {editFormData.oldImage && (
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          Gambar Saat Ini
                        </label>
                        <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                          <img
                            src={`http://localhost:5000/uploads/${editFormData.oldImage}`}
                            alt="Gambar sebelumnya"
                            className="w-48 h-32 object-cover rounded-lg border shadow-md"
                          />
                        </div>
                      </div>
                    )}

                    {/* Upload Gambar Baru */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
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
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        Upload Gambar Baru (Opsional)
                      </label>
                      <div className="relative group">
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }))
                          }
                          className="w-full border-2 border-dashed border-slate-300 px-6 py-8 rounded-xl text-center bg-slate-50/50 hover:border-emerald-400 transition-all duration-300 cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-emerald-500 file:to-green-600 file:text-white hover:file:shadow-lg group-hover:bg-emerald-50/50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-300">
                            <svg
                              className="mx-auto h-12 w-12 mb-3"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="font-semibold text-sm">
                              Klik untuk upload gambar baru
                            </p>
                            <p className="text-xs mt-1">PNG, JPG hingga 10MB</p>
                          </div>
                        </div>
                      </div>
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
    </div>
  );
}
