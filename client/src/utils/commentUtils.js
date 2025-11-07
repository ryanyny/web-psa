export const updateNestedComment = (commentsList, commentId, newContent) => {
    const updateRecursively = (arr) =>
        arr.map((c) => {
            if (c.id === commentId) {
                return { ...c, content: newContent }
            }

            if (c.replies) {
                return { ...c, replies: updateRecursively(c.replies) }
            }

            return c
        })

        return updateRecursively(commentsList)
}

export const filterNestedComments = (commentList, commentToDeleteId) => {
    const filterRecursively = (arr) =>
        arr.filter((c) => {
            if (c.id === commentToDeleteId) return false

            if (c.replies) c.replies = filterRecursively(c.replies)

            return true
        })

        return filterRecursively(commentList)
}