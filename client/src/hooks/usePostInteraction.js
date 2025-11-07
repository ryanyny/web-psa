import { useState, useCallback } from "react"
import { likes, bookmarks } from "../http/index.js"
import { toast } from "react-toastify"

export const usePostLikes = (postId, user, initialCount = 0, initialLiked = false) => {
    const [likeCount, setLikeCount] = useState(initialCount)
    const [userLiked, setUserLiked] = useState(initialLiked)

    const handleToggleLike = useCallback(async () => {
        if (!user) return toast.info("Login untuk menyukai postingan ini!")

        try {
            const res = await likes.toggle(postId)

            if (res.data.liked) {
                setLikeCount((prev) => prev + 1)
                setUserLiked(true)
            } else {
                setLikeCount((prev) => Math.max(prev - 1, 0))
                setUserLiked(false)
            }
        } catch (error) {
            console.error("Gagal mengubah status like: ", error)
            toast.error("Gagal mengubah status like!")
        }
    }, [postId, user])

    return { likeCount, userLiked, handleToggleLike, setLikeCount, setUserLiked}
}

export const usePostBookmarks = (postId, user, initialCount = 0, initialBookmarked = false) => {
    const [bookmarkCount, setBookmarkCount] = useState(initialCount)
    const [userBookmarked, setUserBookmarked] = useState(initialBookmarked)

    const handleToggleBookmark = useCallback(async () => {
        if (!user) return toast.info("Login untuk menyimpan postingan ini!")

        try {
            const res = await bookmarks.toggle(postId)

            if(res.data.bookmarked) {
                setBookmarkCount((prev) => prev + 1)
                setUserBookmarked(true)
            } else {
                setBookmarkCount((prev) => Math.max(prev - 1, 0))
                setUserBookmarked(false)
            }
        } catch (error) {
            console.error("Gagal mengubah status bookmark: ", error)
            toast.error("Gagal mengubah status bookmark!")
        }
    }, [postId, user])

    return { bookmarkCount, userBookmarked, handleToggleBookmark, setBookmarkCount, setUserBookmarked}
}