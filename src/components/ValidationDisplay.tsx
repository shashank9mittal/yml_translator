interface ValidationDisplayProps {
  ymlInput: string;
  validationStatus: 'valid' | 'invalid' | 'empty';
  parsedJson: string;
}

export default function ValidationDisplay({ ymlInput, validationStatus, parsedJson }: ValidationDisplayProps) {
  if (!ymlInput.trim()) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center mb-2">
        <label className="block mr-2 font-medium text-gray-700 text-sm">
          Validation & JSON Conversion
        </label>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          validationStatus === 'valid' ? 'bg-green-100 text-green-800' :
          validationStatus === 'invalid' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {validationStatus === 'valid' ? '✅ Valid' :
           validationStatus === 'invalid' ? '❌ Invalid' : 'Empty'}
        </span>
      </div>
      <textarea
        value={parsedJson}
        readOnly
        className={`w-full h-48 p-3 border rounded-md font-mono text-sm resize-vertical ${
          validationStatus === 'valid' ? 'bg-green-50 border-green-300 text-gray-900' :
          validationStatus === 'invalid' ? 'bg-red-50 border-red-300 text-red-900' :
          'bg-gray-50 border-gray-300 text-gray-900'
        }`}
        placeholder="YAML/JSON validation and conversion will appear here..."
      />
    </div>
  );
}