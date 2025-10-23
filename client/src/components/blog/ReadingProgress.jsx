import { useState, useEffect } from "react"

const ReadingProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const calculateScrollPercentage = () => {

      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = document.documentElement.scrollTop

      let percentage = 0
      if (scrollHeight > 0) {
        percentage = Math.round((scrolled / scrollHeight) * 100)
      }

      setScrollPercentage(percentage)
    }

    window.addEventListener("scroll", calculateScrollPercentage)
    calculateScrollPercentage()

    return () => {
      window.removeEventListener("scroll", calculateScrollPercentage)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gray-200 z-[9999] w-full"
      aria-hidden="true"
    >
      <div
        className="h-full bg-brand-blue transition-all duration-100 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  )
}

export default ReadingProgress