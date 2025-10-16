const FileInputDisplay = ({ name, label, value, handleFileChange, handleFileRemove, required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">{label} {required && '*'}</label>
      {value ? (
        // Tampilan jika file SUDAH ADA di state
        <div className="flex items-center justify-between p-2 border border-gray-300 rounded-md bg-gray-50">
          <span className="text-gray-700 truncate" title={value.name}>📄 {value.name}</span>
          <button
            type="button"
            onClick={() => handleFileRemove(name)}
            className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </div>
      ) : (
        // Tampilan jika file BELUM ADA di state
        <input
          type="file"
          id={name}
          name={name}
          onChange={(e) => handleFileChange(name, e.target.files[0])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      )}
    </div>
  );
};

export default FileInputDisplay;