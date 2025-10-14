// src/pages/Home.jsx (Kode Final dan Lengkap)

import React, { useState, useEffect, useMemo } from "react";
import { posts, categories } from "../../http/index.js";
import PostCard from "../../components/blog/PostCard.jsx";
import Pagination from "../../components/blog/Pagination.jsx"; 

const Home = () => {
  // State untuk semua post (data mentah)
  const [allPosts, setAllPosts] = useState([]);
  // State untuk post yang sudah difilter/search (list yang akan dipaginasi)
  const [list, setList] = useState([]); 
  
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState(""); // State untuk keyword pencarian
  
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Jumlah post per halaman (3x3 grid)

  // 1. FETCH DATA MENTAH
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postsRes = await posts.getAll(); 
        setAllPosts(postsRes.data);
        
        const categoryRes = await categories.getAll();
        setCategoryList(categoryRes.data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. LOGIKA FILTERING & SEARCHING (useMemo untuk komputasi dan side effect)
  useMemo(() => { 
    let currentList = allPosts;

    // A. Filter berdasarkan Kategori
    if (selectedCategory) {
      currentList = currentList.filter(post => 
        post.categories.some(cat => String(cat.id) === selectedCategory)
      );
    }

    // B. Filter berdasarkan Search Term (Case-insensitive)
    if (search.trim()) {
      const lowerCaseSearch = search.toLowerCase();
      
      currentList = currentList.filter(post =>
        post.title.toLowerCase().includes(lowerCaseSearch) ||
        post.excerpt.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Panggil side effect untuk memperbarui state 'list' dan 'currentPage'
    setList(currentList);
    setCurrentPage(1); 

    return currentList; 
  }, [allPosts, selectedCategory, search]); 

  // 3. HANDLERS
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSearch(""); 
  };
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSelectedCategory(""); 
  };

  // 4. LOGIKA PAGINATION
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(list.length / postsPerPage);

  // 5. LOADING & INITIAL EMPTY STATE
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
        Memuat postingan...
      </div>
    );
  
  // Jika tidak ada postingan sama sekali (setelah fetch awal)
  if (!allPosts.length)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-gray-400 text-lg italic gap-3">
        <p>Belum ada postingan yang tersedia 😔</p>
      </div>
    );

  return (
    <section className="py-12 md:py-5">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <h1 className="text-4xl font-extrabold text-brand-navy mb-2 tracking-tight">
          Blog Terbaru
        </h1>
        <p className="text-lg text-gray-600 mb-10">Temukan artikel dan cerita menarik disini.</p>

        {/* AREA SEARCH BAR DAN FILTER (POLISHED UI) */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          {/* Search Input Field */}
          <div className="relative w-full md:w-1/2">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari judul atau ringkasan postingan..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-full bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition duration-200" 
            />
          </div>

          {/* Dropdown Kategori */}
          <div className="relative w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="appearance-none pl-4 pr-12 py-3 border-2 border-gray-300 rounded-full bg-white text-gray-700 font-medium shadow-sm hover:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition duration-200 cursor-pointer w-full"
            >
              <option value="">Semua Blog</option>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Info total posts */}
        <div className="mb-5 text-sm text-gray-600">
            {search.trim() ? (
                `Menampilkan ${list.length} hasil untuk "${search}"`
            ) : (
                `Menampilkan ${indexOfFirstPost + 1}-${Math.min(indexOfLastPost, list.length)} dari ${list.length} postingan`
            )}
        </div>

        {/* KONDISI TAMPILAN KONTEN (GRID atau EMPTY STATE) */}
        {currentPosts.length > 0 ? (
            // Jika ada postingan: Tampilkan Grid
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
        ) : (
            // Jika tidak ada postingan (karena filter/search): Tampilkan Pesan Empty State
            <div className="flex flex-col justify-center items-center py-20 bg-brand-light-gray rounded-lg border border-gray-200">
                <p className="text-xl text-gray-600 font-medium mb-4">
                    Tidak ada postingan yang cocok dengan kriteria tersebut 😔
                </p>
            </div>
        )}

        {/* Pagination - hanya tampil jika ada lebih dari 1 halaman DAN ada postingan yang ditampilkan */}
        {totalPages > 1 && currentPosts.length > 0 && ( 
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-12"
          />
        )}
      </div>
    </section>
  );
};

export default Home;