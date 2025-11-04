import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function ProgramAdmin() {
  const [formData, setFormData] = useState({
    nama_program: "",
    deskripsi: "",
    image: "",
    tanggal_dilaksanakan: "",
    status: "",
  });

  const [programs, setPrograms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchPrograms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/programs");
      setPrograms(res.data);
    } catch (err) {
      console.error("Gagal mengambil data program:", err);
    }
  };

  // Handle Submit untuk form tambah (hanya untuk tambah program baru)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("nama_program", formData.nama_program);
      data.append("deskripsi", formData.deskripsi);
      data.append("tanggal_dilaksanakan", formData.tanggal_dilaksanakan);
      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.post("http://localhost:5000/api/programs/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Data program berhasil ditambahkan");

      // Reset form
      setFormData({
        nama_program: "",
        deskripsi: "",
        tanggal_dilaksanakan: "",
        image: "",
        status: "",
      });
      fetchPrograms();
    } catch (err) {
      console.error("Gagal submit program:", err);
      alert("Terjadi kesalahan saat menyimpan data program");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Modal Detail
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDetail = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus program ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/programs/${id}`);
      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.id !== id)
      );
      alert("Program berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus program:", err.message);
      alert("Terjadi kesalahan saat menghapus program.");
    }
  };

  // Modal Edit - State terpisah
  const [editFormData, setEditFormData] = useState({
    nama_program: "",
    deskripsi: "",
    image: "",
    tanggal_dilaksanakan: "",
    status: "",
    oldImage: "",
  });
  const [selectedProgramEdit, setSelectedProgramEdit] = useState(null);
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

  const handleEdit = (program) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };

    setEditFormData({
      nama_program: program.nama_program,
      deskripsi: program.deskripsi,
      image: "",
      tanggal_dilaksanakan: formatDate(program.tanggal_dilaksanakan),
      status:
        program.status?.toLowerCase() === "tidak aktif"
          ? "Tidak Aktif"
          : "Aktif",
      oldImage: program.image,
    });
    setEditId(program.id);
    setSelectedProgramEdit(program);
    setShowModalEdit(true);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
    setSelectedProgramEdit(null);
    setEditFormData({
      nama_program: "",
      deskripsi: "",
      image: "",
      tanggal_dilaksanakan: "",
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
      data.append("nama_program", editFormData.nama_program);
      data.append("deskripsi", editFormData.deskripsi);
      data.append("tanggal_dilaksanakan", editFormData.tanggal_dilaksanakan);
      data.append("status", editFormData.status);

      if (editFormData.image) {
        data.append("image", editFormData.image);
      }

      await axios.put(
        `http://localhost:5000/api/programs/edit/${editId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Data program berhasil diubah");
      setShowModalEdit(false);
      fetchPrograms();
    } catch (err) {
      console.error("Gagal edit program:", err);
      alert("Terjadi kesalahan saat mengubah data program");
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
                Program Management
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Kelola dan pantau semua program dengan mudah
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>{programs.length} Program</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Tambah Program */}
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
              <h2 className="text-2xl font-bold text-white mb-1">
                Tambah Program Baru
              </h2>
              <p className="text-indigo-100 font-medium">
                Isi formulir di bawah untuk menambahkan program baru
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                Nama Program:
              </p>
              <input
                type="text"
                name="nama_program"
                value={formData.nama_program}
                onChange={handleChange}
                placeholder="Nama Program"
                required
                className="w-full border-2 border-slate-200 px-6 py-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 hover:border-slate-300"
              />
            </div>

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
                Deskripsi Program:
              </p>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsi Program"
                required
                rows="4"
                className="w-full border-2 border-slate-200 px-6 py-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 hover:border-slate-300 resize-none"
              />
            </div>

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
                Cover Program:
              </p>
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
                className="w-full border-2 border-dashed border-slate-300 px-6 py-8 rounded-2xl text-center bg-slate-50/50 hover:border-blue-400 transition-all duration-300 cursor-pointer"
              />
            </div>

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
                Tanggal Acara Program:
              </p>
              <input
                type="date"
                name="tanggal_dilaksanakan"
                value={formData.tanggal_dilaksanakan}
                onChange={handleChange}
                required
                className="w-full border-2 border-slate-200 px-6 py-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 hover:border-slate-300"
              />
            </div>

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
                    Tambah Program
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tabel Program */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-10 py-8 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                Daftar Program
              </h3>
              <p className="text-slate-600 font-medium">
                Kelola semua program yang telah dibuat
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-slate-600">
                {programs.filter((p) => p.status === "aktif").length} Aktif
              </span>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm font-bold text-slate-600">
                {programs.filter((p) => p.status === "tidak aktif").length}{" "}
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
                  Nama
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
              {programs.map((program) => (
                <tr
                  className="text-center hover:bg-blue-50/50 transition-all duration-300 group"
                  key={program.id}
                >
                  <td className="border-0 px-8 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                          {program.nama_program.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              program.status === "Aktif"
                                ? "bg-green-400"
                                : "bg-red-400"
                            }`}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-slate-800 text-lg mb-1">
                          {program.nama_program}
                        </h4>
                        <p className="text-slate-500 text-sm font-medium truncate max-w-md">
                          {program.deskripsi}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 px-6 py-8">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-lg ${
                        program.status === "aktif"
                          ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                          : "bg-gradient-to-r from-red-400 to-rose-500 text-white"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          program.status === "aktif"
                            ? "bg-white animate-pulse"
                            : "bg-white"
                        }`}
                      ></div>
                      {program.status}
                    </span>
                  </td>
                  <td className="border-0 px-6 py-8 text-slate-600 font-bold">
                    {new Date(program.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border-0 px-6 py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleDetail(program)}
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
                        onClick={() => handleEdit(program)}
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
                        onClick={() => handleDelete(program.id)}
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

          {programs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-400 mb-6">
                <svg
                  className="mx-auto h-24 w-24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                Belum ada program
              </h3>
              <p className="text-slate-500 font-medium">
                Tambahkan program pertama Anda menggunakan form di atas
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl relative overflow-hidden transform scale-100 transition-all duration-300">
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-6">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Detail Program
                    </h3>
                    <p className="text-indigo-100 font-medium">
                      Informasi lengkap program
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
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

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Info Program */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
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
                      Informasi Program
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Nama Program
                          </p>
                          <p className="text-slate-900 font-bold text-lg">
                            {selectedProgram.nama_program}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Deskripsi
                          </p>
                          <p className="text-slate-900 leading-relaxed">
                            {selectedProgram.deskripsi}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Tanggal Pelaksanaan
                          </p>
                          <p className="text-slate-900 font-bold">
                            {new Date(
                              selectedProgram.tanggal_dilaksanakan
                            ).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            selectedProgram.status === "Aktif"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Status
                          </p>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                              selectedProgram.status === "Aktif"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                selectedProgram.status === "Aktif"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            {selectedProgram.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Dibuat Pada
                          </p>
                          <p className="text-slate-900">
                            {new Date(
                              selectedProgram.created_at
                            ).toLocaleDateString("id-ID", {
                              day: "2-digit",
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
                </div>

                {/* Cover Program */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-purple-600"
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
                      Cover Program
                    </h4>

                    <div className="relative group">
                      {selectedProgram.image ? (
                        <div className="relative overflow-hidden rounded-xl shadow-lg">
                          <img
                            src={`http://localhost:5000/uploads/${selectedProgram.image}`}
                            alt={selectedProgram.nama_program}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <svg
                              className="mx-auto h-16 w-16 text-slate-400 mb-3"
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
                            <p className="text-slate-500 font-medium">
                              Tidak ada gambar
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {showModalEdit && selectedProgramEdit && (
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
                      Edit Program
                    </h2>
                    <p className="text-green-100 font-medium">
                      Perbarui informasi program
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
                  {/* Nama Program */}
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
                      Nama Program
                    </label>
                    <input
                      type="text"
                      name="nama_program"
                      value={editFormData.nama_program}
                      onChange={handleEditChange}
                      placeholder="Masukkan nama program"
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
                      Deskripsi Program
                    </label>
                    <textarea
                      name="deskripsi"
                      value={editFormData.deskripsi}
                      onChange={handleEditChange}
                      placeholder="Masukkan deskripsi program"
                      required
                      rows="4"
                      className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700 resize-none"
                    />
                  </div>

                  {/* Tanggal Pelaksanaan */}
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Tanggal Pelaksanaan
                    </label>
                    <input
                      type="date"
                      name="tanggal_dilaksanakan"
                      value={editFormData.tanggal_dilaksanakan}
                      onChange={handleEditChange}
                      required
                      className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700"
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
                      Status Program
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
  );
}
