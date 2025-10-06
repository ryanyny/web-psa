import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardAdmin() {
  //mengambil total data user
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch total user
    axios
      .get("http://localhost:5000/api/users/total")
      .then((res) => setTotalUsers(res.data.total))
      .catch((err) => console.error("Gagal memuat total users:", err));

    // Fetch data users
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Gagal memuat data users:", err));
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Gagal mengambil data role user:", err);
    }
  };

  //mengambil total data program
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    // Fetch total program
    axios
      .get("http://localhost:5000/api/programs/total")
      .then((res) => setTotalPrograms(res.data.total))
      .catch((err) => console.error("Gagal memuat total programs:", err));

    // Fetch data program
    axios
      .get("http://localhost:5000/api/programs")
      .then((res) => setPrograms(res.data))
      .catch((err) => console.error("Gagal memuat data programs:", err));
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/programs");
      setPrograms(res.data);
    } catch (err) {
      console.error("Gagal mengambil data programs:", err);
    }
  };

  //mengambil total data mitra
  const [totalMitras, setTotalMitras] = useState(0);
  const [mitras, setMitras] = useState([]);

  useEffect(() => {
    // Fetch total mitra
    axios
      .get("http://localhost:5000/api/mitra/total")
      .then((res) => setTotalMitras(res.data.total))
      .catch((err) => console.error("Gagal memuat total mitra:", err));

    // Fetch data mitra
    axios
      .get("http://localhost:5000/api/mitra")
      .then((res) => setMitras(res.data))
      .catch((err) => console.error("Gagal memuat data mitra:", err));
  }, []);

  const fetchMitras = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mitra");
      setMitras(res.data);
    } catch (err) {
      console.error("Gagal mengambil data mitra:", err);
    }
  };

  //mengambil total data peserta
  const [totalPeserta, setTotalPeserta] = useState(0);
  const [peserta, setPeserta] = useState([]);

  useEffect(() => {
    // Fetch total peserta
    axios
      .get("http://localhost:5000/api/peserta/total")
      .then((res) => setTotalPeserta(res.data.total))
      .catch((err) => console.error("Gagal memuat total peserta:", err));

    // Fetch data mitra
    axios
      .get("http://localhost:5000/api/peserta")
      .then((res) => setMitras(res.data))
      .catch((err) => console.error("Gagal memuat data peserta:", err));
  }, []);

  const fetchPeserta = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/peserta");
      setPeserta(res.data);
    } catch (err) {
      console.error("Gagal mengambil data peserta:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data users ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);

      // Hapus user dari state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      alert("Data User berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus data user:", err.message);
      alert("Terjadi kesalahan saat menghapus data users.");
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDetail = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
  };

  const [editFormData, setEditFormData] = useState({
    role: "", // bisa 'admin' atau 'user'
  });

  const [selectedUserEdit, setSelectedUserEdit] = useState(null);
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

  const handleEdit = (user) => {
    setEditFormData({
      role: user.role,
    });
    setEditId(user.id);
    setSelectedUserEdit(user);
    setShowModalEdit(true);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
    setSelectedUserEdit(null);
    setEditFormData({
      role: "",
    });
    setEditId(null);
  };

  // Handle Submit Edit - terpisah dari form tambah
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditSubmitting(true);

    try {
      const data = new FormData();
      data.append("role", editFormData.role);

      await axios.put(`http://localhost:5000/api/users/edit/${editId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Role user berhasil diubah");
      setShowModalEdit(false);
      fetchUsers();
    } catch (err) {
      console.error("Gagal edit role user:", err);
      alert("Terjadi kesalahan saat mengubah role user");
    } finally {
      setIsEditSubmitting(false);
    }
  };

  return (
    <div className="p-8 ">
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard Admin Punya Skill Akademi
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Kelola dan pantau sistem Punya Skill Akademi dengan mudah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Total Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500">
          <h2 className="text-lg text-gray-700 font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalUsers}</p>
        </div>

        {/*Card Total Programs */}
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500">
          <h2 className="text-lg text-gray-700 font-semibold">
            Total Programs
          </h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalPrograms}
          </p>
        </div>

        {/*Card Total Mitra */}
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500">
          <h2 className="text-lg text-gray-700 font-semibold">Total Mitra</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalMitras}</p>
        </div>

         {/*Card Total peserta */}
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500">
          <h2 className="text-lg text-gray-700 font-semibold">Total Peserta</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalPeserta}</p>
        </div>
      </div>

      {/* Tabel Program */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-10 py-8 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                Daftar User Punya Skill Akademi
              </h3>
              <p className="text-slate-600 font-medium">
                Kelola semua data pengguna
              </p>
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
                  Email
                </th>
                <th className="border-0 px-6 py-6 font-black text-slate-700 text-center text-lg">
                  Role
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
              {users.map((user) => (
                <tr
                  className="text-center hover:bg-blue-50/50 transition-all duration-300 group"
                  key={user.id}
                >
                  <td className="border-0 px-8 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-slate-800 text-lg mb-1">
                          {user.name}
                        </h4>
                        <p className="text-slate-500 text-sm font-medium truncate max-w-md">
                          {user.gender}
                        </p>
                        <p className="text-slate-500 text-sm font-medium truncate max-w-md">
                          {user.created_at}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 px-6 py-8 text-slate-600 font-medium">
                    <p className="text-slate-800 text-lg mb-1">{user.email}</p>
                  </td>
                  <td className="border-0 px-6 py-8 text-slate-600 font-medium">
                    <p className="text-slate-800 text-lg mb-1">{user.role}</p>
                  </td>
                  <td className="border-0 px-6 py-8 text-slate-600 font-bold">
                    {new Date(user.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border-0 px-6 py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleDetail(user)}
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
                        onClick={() => handleEdit(user)}
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
                        onClick={() => handleDelete(user.id)}
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

      {/* Modal Detail */}
      {showModal && selectedUser && (
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
                      Detail User
                    </h3>
                    <p className="text-indigo-100 font-medium">
                      Informasi lengkap User
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
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
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
                      Informasi User
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Nama Pengguna
                          </p>
                          <p className="text-slate-900 font-bold text-lg">
                            {selectedUser.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Email
                          </p>
                          <p className="text-slate-900 leading-relaxed">
                            {selectedUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Jenis Kelamin
                          </p>
                          <p className="text-slate-900 leading-relaxed">
                            {selectedUser.gender}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            Role
                          </p>
                          <p className="text-slate-900 leading-relaxed">
                            {selectedUser.role}
                          </p>
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
                              selectedUser.created_at
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {showModalEdit && selectedUserEdit && (
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
                      Edit Role User
                    </h2>
                    <p className="text-green-100 font-medium">
                      Perbarui informasi user
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
                          d="M5.121 17.804A7.5 7.5 0 0112 15.5a7.5 7.5 0 016.879 2.304M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Role Pengguna
                    </label>
                    <select
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditChange}
                      required
                      className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 focus:bg-white font-medium text-slate-700"
                    >
                      <option value="" disabled>
                        -- Pilih Role --
                      </option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
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
