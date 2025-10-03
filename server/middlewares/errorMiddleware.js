// Middleware untuk handle semua error di server
const errorHandler = (err, req, res, next) => {
    // Ambil status code dari response, jika belum di set atau 200, default ke 500
    const statusCode = res.statusCode && res.statusCode !== 200
        ? res.statusCode
        : 500
    
    // Set status code
    res.status(statusCode)

    // Kirim response JSON berisi message error dan stack trace
    res.json({
        message: err.message,
        // Stack trace hanya ditampilkan di development, bukan production
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

export default errorHandler