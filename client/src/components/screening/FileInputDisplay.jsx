import React from 'react';

const FileInputDisplay = ({ 
  name, 
  label, 
  value, 
  handleFileChange, 
  handleFileRemove, 
  required = false,
  showValidation = false 
}) => {
  const hasError = showValidation && required && !value;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label} {required && '*'}
      </label>
      
      {value ? (
        // Tampilan jika file SUDAH ADA di state - DITAMBAH VISUAL FEEDBACK
        <div className={`flex items-center justify-between p-3 border rounded-md transition-colors ${
          hasError 
            ? 'border-red-300 bg-red-50' 
            : 'border-green-300 bg-green-50'
        }`}>
          <div className="flex items-center space-x-3">
            {/* File Icon */}
            <div className={`p-2 rounded-full ${
              hasError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div>
              <span className="text-gray-700 font-medium text-sm" title={value.name}>
                {value.name}
              </span>
              <div className="text-xs text-gray-500 mt-1">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => handleFileRemove(name)}
            className="ml-4 px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus
          </button>
        </div>
      ) : (
        // Tampilan jika file BELUM ADA di state - DITAMBAH VISUAL FEEDBACK
        <div className={`border rounded-md transition-colors ${
          hasError 
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}>
          <input
            type="file"
            id={name}
            name={name}
            onChange={(e) => handleFileChange(name, e.target.files[0])}
            className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors ${
              hasError 
                ? 'focus:ring-red-500 bg-red-50' 
                : 'focus:ring-blue-500'
            }`}
          />
        </div>
      )}

      {/* Error message */}
      {hasError && (
        <p className="mt-2 text-xs text-red-600 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {label} wajib diupload
        </p>
      )}

      {/* Success hint */}
      {value && !hasError && (
        <p className="mt-2 text-xs text-green-600 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          File berhasil diupload
        </p>
      )}

      {/* Info hint untuk file input kosong */}
      {!value && !hasError && (
        <p className="mt-2 text-xs text-gray-500 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Pilih file untuk diupload (max. 10MB)
        </p>
      )}
    </div>
  );
};

export default FileInputDisplay;