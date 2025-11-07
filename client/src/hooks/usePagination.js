import { useState, useMemo, useEffect } from "react"

const usePagination = (list = [], postsPerPage = 9) => {
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setCurrentPage(1)
    }, [list])

    const { currentPosts, totalPages, indexOfFirstPost, indexOfLastPost } = useMemo(() => {
        const totalItems = list.length
        const totalPages = Math.ceil(totalItems / postsPerPage)     
        const indexOfLastPost = currentPage * postsPerPage
        const indexOfFirstPost = indexOfLastPost - postsPerPage
        const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost)

        return { currentPosts, totalPages, indexOfFirstPost, indexOfLastPost }
    }, [list, currentPage, postsPerPage])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return { currentPage, currentPosts, totalPages, indexOfFirstPost, indexOfLastPost, handlePageChange }
}

export default usePagination