interface TranslatedOutputProps {
  translatedOutput: string;
  validationStatus?: 'valid' | 'invalid' | 'empty';
  validationMessage?: string;
}

export default function TranslatedOutput({ translatedOutput, validationStatus = 'empty', validationMessage }: TranslatedOutputProps) {
  if (!translatedOutput) {
    return null;
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(translatedOutput);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="translated-output" className="block font-medium text-gray-700 text-sm">
          Translated YAML
        </label>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          validationStatus === 'valid' ? 'bg-green-100 text-green-800' :
          validationStatus === 'invalid' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {validationStatus === 'valid' ? '✅ Valid Output' :
           validationStatus === 'invalid' ? '❌ Invalid Output' : 'Processing'}
        </span>
      </div>
      {validationMessage && validationStatus === 'invalid' && (
        <div className="bg-red-50 mb-2 p-2 border border-red-200 rounded text-red-700 text-sm">
          {validationMessage}
        </div>
      )}
      <textarea
        id="translated-output"
        value={translatedOutput}
        readOnly
        className="bg-gray-50 p-3 border border-gray-300 rounded-md w-full h-64 font-mono text-gray-900 text-sm resize-vertical"
      />
      <div className="flex justify-center mt-4">
        <button
          onClick={handleCopyToClipboard}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-white transition-colors duration-200"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}