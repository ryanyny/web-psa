// src/pages/MyPosts.jsx (Refactored)

import { useEffect, useState, useContext } from "react";
import { posts } from "../../http/index.js";
import AuthContext from "../../context/AuthContext.jsx";
import PostCard from "../../components/blog/PostCard.jsx";
import Pagination from "../../components/blog/Pagination.jsx";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Ambil data post

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await posts.getAll(); // Filter post yang dibuat user yang login

        const mine = res.data.filter(
          (p) => String(p.author?.id || p.author) === String(user.id)
        );

        setList(mine);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }; // Hitung data untuk pagination

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(list.length / postsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
        Memuat postinganku...{" "}
      </div>
    ); // 💡 HAPUS EARLY RETURN UNTUK KONDISI POST KOSONG // if (!list.length) //   return ( //     <div className="flex justify-center items-center h-[60vh] text-gray-400 text-lg italic"> //       Kamu belum nulis apa-apa nih. //     </div> //   );

  return (
    <section className="py-12 md:py-5">
      {" "}
      <div className="container mx-auto px-4">
        {/* Header yang Diperbarui */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-brand-navy mb-2 tracking-tight">
            Postinganku
          </h1>
          <p className="mt-10 text-sm text-gray-600">
            Menampilkan {indexOfFirstPost + 1}-
            {Math.min(indexOfLastPost, list.length)} dari {list.length} postinganmu
          </p>
        </div>
        {/* KONDISI KONTEN: GRID atau EMPTY STATE */}
        {list.length > 0 ? (
          <>
            {/* Grid posts - hanya tampilkan currentPosts */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
            {/* Pagination - hanya tampil jika ada lebih dari 1 halaman */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          // Tampilkan Pesan Empty State yang lebih terstruktur
          <div className="flex flex-col justify-center items-center py-20 bg-brand-light-gray rounded-lg border border-gray-200">
            <p className="text-xl text-gray-600 font-medium mb-4">
              Kamu belum menulis postingan apa-apa nih 📝
            </p>
            {/* Anda bisa menambahkan tombol untuk mengarahkan ke halaman buat post baru */}
            <a
              href="/blog/create" // Ganti dengan path create post Anda
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Mulai Tulis Sekarang
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPosts;