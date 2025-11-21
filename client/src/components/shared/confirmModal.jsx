const ConfirmModal = ({
    open,
    title = "Konfirmasi",
    message = "Yakin dengan aksi ini?",
    onCancel,
    onConfirm,
    confirmText = "Hapus",
    cancelText = "Batal",
}) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
                <h2 className="text-lg font-semibold mb-3">{title}</h2>

                <p className="text-gray-500 mb-5 text-sm">{message}</p>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                        {cancelText}
                    </button>
                    
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-brand-pink text-white hover:bg-brand-pink/90 transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal