// src/components/common/ReadingProgress.jsx

import React, { useState, useEffect } from "react";

const ReadingProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const calculateScrollPercentage = () => {
      // Tinggi total halaman yang bisa di-scroll
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      // Posisi scroll saat ini
      const scrolled = document.documentElement.scrollTop;

      let percentage = 0;
      if (scrollHeight > 0) {
        // Hitung persentase
        percentage = Math.round((scrolled / scrollHeight) * 100);
      }

      setScrollPercentage(percentage);
    };

    // Tambahkan event listener saat komponen mount
    window.addEventListener("scroll", calculateScrollPercentage);
    // Jalankan satu kali saat mount untuk posisi awal
    calculateScrollPercentage();

    // Hapus event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", calculateScrollPercentage);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gray-200 z-[9999] w-full"
      aria-hidden="true" // Hanya elemen visual, bukan untuk aksesibilitas
    >
      <div
        className="h-full bg-brand-blue transition-all duration-100 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
};

export default ReadingProgress;