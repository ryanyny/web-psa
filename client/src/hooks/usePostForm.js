import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import { categories } from "../http/index.js"

const usePostForm = (initialPostData = null, onSubmitHandler) => {
    const [title, setTitle] = useState(initialPostData?.title || "")
    const [content, setContent] = useState(initialPostData?.content || "")
    const [image, setImage] = useState(initialPostData?.image || "")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(initialPostData ? true : false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)

            try {
                const res = await categories.getAll()
                setCategoryList(res.data)

                if (initialPostData) {
                    const currentCategoryIds = initialPostData.categories
                        ? initialPostData.categories.map((c) => String(c.id))
                        : []
                    setSelectedCategories(currentCategoryIds)
                    setTitle(initialPostData.title)
                    setContent(initialPostData.content)
                    setImage(initialPostData.image || null)
                }
            } catch (error) {
                console.error("Gagal mengambil data form: ", error)
                toast.error("Gagal memuat data kategori atau post!")
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [initialPostData])

    const validatePostForm = useCallback(() => {
        const trimmedTitle = title.trim()
        const trimmedContent = content.trim()

        if (trimmedTitle.length < 5 || trimmedTitle.length > 100)
            return "Judul harus antara 5 hingga 100 karakter."
        if (!/^[a-zA-Z0-9\s.,!?'"-]+$/.test(trimmedTitle))
            return "Judul mengandung karakter tidak valid."
        if (trimmedContent.length < 30)
            return "Konten terlalu pendek. Minimal 30 karakter."
        if (selectedCategories.length === 0)
            return "Pilih minimal satu kategori."

        if (image instanceof File) {
            const validTypes = ["image/jpeg", "image/png", "image/webp"]
            if (!validTypes.includes(image.type))
                return "Format gambar tidak valid. Gunakan JPG, PNG, atau WEBP."
            if (image.size > 3 * 1024 * 1024)
                return "Ukuran gambar maksimal 3MB."
        }

        return null
    }, [title, content, selectedCategories, image])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        const validationError = validatePostForm()
        if (validationError) {
            toast.error(validationError)

            return
        }

        setIsSubmitting(true)

        try {
            const formData = new FormData()

            formData.append("title", title)
            formData.append("content", content)

            selectedCategories.forEach((id) => {
                formData.append("categories[]", id)
            })

            if (image instanceof File) {
                formData.append("image", image)
            } else if (initialPostData && !image) {
                formData.append("delete_image", "true")
            }

            await onSubmitHandler(formData)
        } catch (error) {
            console.error("Gagal menyimpan postingan: ", error)
            toast.error("Gagal menyimpan postingan!")
        } finally {
            setIsSubmitting(false)
        }
    }, [title, content, selectedCategories, image, validatePostForm, onSubmitHandler, initialPostData])

    const handleCategoryChange = useCallback((e) => {
        const values = Array.from(e.target.selectedOptions, (option) => option.value)
        setSelectedCategories(values)
    }, [])

    const handleImageChange = useCallback((e) => {
        const file = e.target.files?.[0]
        if (file) setImage(file)
    }, [])

    const handleRemoveImage = useCallback(() => {
        setImage(null)
    }, [])

    return {
        title, setTitle,
        content, setContent,
        image, setImage,
        selectedCategories, setSelectedCategories,
        categoryList,
        isLoading: loading,
        isSubmitting,
        handleSubmit,
        handleCategoryChange,
        handleImageChange,
        handleRemoveImage,
    }
}

export default usePostForm