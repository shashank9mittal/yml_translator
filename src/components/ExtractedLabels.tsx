interface ExtractedLabelsProps {
  labels: string[];
  selectedField: 'label' | 'name';
}

export default function ExtractedLabels({ labels, selectedField }: ExtractedLabelsProps) {
  if (labels.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-gray-500">
        <div className="text-center">
          <svg className="mx-auto mb-4 w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <p className="font-medium text-lg">Extracted {selectedField}s will appear here</p>
          <p className="mt-2 text-sm">Paste your YAML/JSON data and click &quot;Extract {selectedField === 'label' ? 'Labels' : 'Names'}&quot;</p>
        </div>
      </div>
    );
  }

  const handleCopyLabels = () => {
    const labelsText = labels.join('\n');
    navigator.clipboard.writeText(labelsText);
  };

  const handleCopyExcelFormat = () => {
    const fieldCapitalized = selectedField.charAt(0).toUpperCase() + selectedField.slice(1) + 's';
    const excelFormat = `${fieldCapitalized}\tTranslations\n` + labels.map(label => `${label}\t`).join('\n');
    navigator.clipboard.writeText(excelFormat);
  };

  const handleDownloadExcel = () => {
    const fieldCapitalized = selectedField.charAt(0).toUpperCase() + selectedField.slice(1) + 's';
    const csvContent = `${fieldCapitalized},Translations\n` + labels.map(label => `"${label}",`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-${selectedField}s.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block font-medium text-gray-700 text-sm">
          Extracted {selectedField === 'label' ? 'Labels' : 'Names'} ({labels.length} found)
        </label>
        <span className="bg-green-100 px-2 py-1 rounded font-medium text-green-800 text-xs">
          ✅ {labels.length} {selectedField === 'label' ? 'Labels' : 'Names'} Found
        </span>
      </div>
      
      <div className="bg-gray-50 p-3 border border-gray-300 rounded-md w-full h-64 overflow-y-auto">
        <div className="space-y-2">
          {labels.map((label, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-2 border rounded">
              <span className="font-mono text-gray-900 text-sm">{label}</span>
              <span className="text-gray-500 text-xs">#{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button
          onClick={handleCopyLabels}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors duration-200"
        >
          Copy {selectedField === 'label' ? 'Labels' : 'Names'}
        </button>
        
        <button
          onClick={handleCopyExcelFormat}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors duration-200"
        >
          Copy for Excel
        </button>
        
        <button
          onClick={handleDownloadExcel}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-white text-sm transition-colors duration-200"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}