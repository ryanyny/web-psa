import { useState, useEffect } from "react"

const ReadingProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const calculateScrollPercentage = () => {

      // Tinggi total konten yang bisa digulir
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      // Jumlah piksel yang telah digulir dari atas
      const scrolled = document.documentElement.scrollTop

      let percentage = 0
      if (scrollHeight > 0) {
        // Formula: (Posisi scroll / tinggi total konten yang bisa digulir) * 100
        percentage = Math.round((scrolled / scrollHeight) * 100)
      }

      setScrollPercentage(percentage)
    }

    // --- Setup event listener ---
    window.addEventListener("scroll", calculateScrollPercentage)
    calculateScrollPercentage()

    return () => {
      window.removeEventListener("scroll", calculateScrollPercentage)
    }
  }, []) // Dependency kososng: Hanya dijalankan saat mount

  return (
    // progress bar wrapper (fixed di atas)
    <div
      className="fixed top-0 left-0 h-1 bg-gray-200 z-[9999] w-full"
      aria-hidden="true"
    >
      {/* Bar progress yang bergerak */}
      <div
        className="h-full bg-brand-blue transition-all duration-100 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  )
}

export default ReadingProgress