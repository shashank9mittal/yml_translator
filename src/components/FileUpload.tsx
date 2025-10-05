interface FileUploadProps {
  selectedFile: File | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUpload({ selectedFile, onFileUpload }: FileUploadProps) {
  return (
    <div>
      <label htmlFor="excel-upload" className="block mb-2 font-medium text-gray-700 text-sm">
        Excel File Upload
      </label>
      <div className="flex items-center space-x-4">
        <input
          id="excel-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileUpload}
          className="block hover:file:bg-blue-100 file:bg-blue-50 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-md w-full file:font-semibold text-gray-500 file:text-blue-700 text-sm file:text-sm"
        />
        {selectedFile && (
          <span className="text-green-600 text-sm">
            ✓ {selectedFile.name}
          </span>
        )}
      </div>
    </div>
  );
}