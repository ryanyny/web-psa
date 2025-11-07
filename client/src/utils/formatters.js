export const formatIndonesianDate = (dateString) => {
    if (!dateString) return "Tanggal Tidak Diketahui!"

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    try {
        return new Date(dateString).toLocaleDateString("id-ID", options)
    } catch (error) {
        console.error("Gagal memformat tanggal: ", error)

        return "Tanggal Invalid!"
    }
}