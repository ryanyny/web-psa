// Middleware untuk handle semua error di server
const errorHandler = (err, req, res, next) => {
    // Ambil status code dari response, jika status code lebih dan sama dengan 400, default ke 500
    const statusCode = res.statusCode >= 400
        ? res.statusCode
        : 500

    // Kirim response JSON berisi message error dan stack trace
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong!",
        // Stack trace hanya ditampilkan di development, bukan production
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    })
}

export default errorHandler