// Middleware error handler global
const errorHandler = (err, req, res, next) => {
    // Jika >= 400 (client error), jika tidak, gunakan 500 (internal server error) sebagai default
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500
    
    // Set status respons sesuai dengan kode yang ditentukan
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong!",
        // Stack trace disembunyikan di production untuk keamanan
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    })
}

export default errorHandler