'use client';

import { useState } from 'react';
import YmlInput from '@/components/YmlInput';
import FileUpload from '@/components/FileUpload';
import TranslatedOutput from '@/components/TranslatedOutput';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import { parseInput, readExcelFile, createTranslationMap, translateLabels, validateOutput } from '@/utils/translationUtils';

export default function Home() {
  const [ymlInput, setYmlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [translatedOutput, setTranslatedOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputValidationStatus, setOutputValidationStatus] = useState<'valid' | 'invalid' | 'empty'>('empty');
  const [outputValidationMessage, setOutputValidationMessage] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleValidationChange = (status: 'valid' | 'invalid' | 'empty', parsedJsonData: string) => {
    // Clear any previous messages when input changes
    setErrorMessage(null);
    setSuccessMessage(null);
    setOutputValidationStatus('empty');
    setOutputValidationMessage('');
  };

  const handleProcess = async () => {
    // Clear previous messages
    setErrorMessage(null);
    setSuccessMessage(null);
    setOutputValidationStatus('empty');
    setOutputValidationMessage('');

    // Validation
    if (!ymlInput.trim()) {
      setErrorMessage('Please enter YAML data in the input field.');
      return;
    }
    if (!selectedFile) {
      setErrorMessage('Please select an Excel file with translations.');
      return;
    }

    setIsProcessing(true);

    try {
      // Parse input data
      const ymlData = parseInput(ymlInput);
      console.log('Parsed data:', ymlData);

      // Read Excel file
      const excelData = await readExcelFile(selectedFile);
      console.log('Excel data:', excelData);

      // Validate Excel structure
      if (!excelData || excelData.length < 2) {
        throw new Error('Excel file appears to be empty or has no data rows.');
      }

      // Create translation map
      const translationMap = createTranslationMap(excelData);
      console.log('Translation map:', translationMap);

      if (Object.keys(translationMap).length === 0) {
        throw new Error('No translations found in Excel file. Please ensure columns A and B contain labels and translations.');
      }

      // Apply translations
      const translatedData = translateLabels(ymlData, translationMap);
      console.log('Translated data:', translatedData);

      // Convert to the specific escaped string format
      const jsonString = JSON.stringify(translatedData, null, 2);
      const escapedString = JSON.stringify(jsonString);

      // Set the translated output in the escaped format
      setTranslatedOutput(escapedString);

      // Validate the output
      const validation = validateOutput(escapedString);
      if (validation.isValid) {
        setOutputValidationStatus('valid');
        setOutputValidationMessage('');
        setSuccessMessage(`Translation completed successfully! Found ${Object.keys(translationMap).length} translations in your Excel file.`);
      } else {
        setOutputValidationStatus('invalid');
        setOutputValidationMessage(validation.message || 'Unknown validation error');
        setSuccessMessage(`Translation completed with warnings. Found ${Object.keys(translationMap).length} translations, but output validation failed.`);
      }

    } catch (error) {
      console.error('Error processing files:', error);
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrorMessage(`Translation failed: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sticky Full-Width Header */}
      <div className="top-0 z-50 sticky bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="flex justify-center items-center space-x-2 px-4 py-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h1 className="font-bold text-white text-xl tracking-tight">YML Processor</h1>
          <span className="hidden sm:inline text-blue-100 text-sm">Transform • Translate • Deploy</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="mx-auto max-w-7xl">

          {/* Two-Column Layout for Input and Output */}
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 mb-4">
            {/* Left Column - Input */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <YmlInput
                value={ymlInput}
                onChange={setYmlInput}
                onValidationChange={handleValidationChange}
              />
            </div>

            {/* Right Column - Output */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              {translatedOutput ? (
                <TranslatedOutput
                  translatedOutput={translatedOutput}
                  validationStatus={outputValidationStatus}
                  validationMessage={outputValidationMessage}
                />
              ) : (
                <div className="flex justify-center items-center h-full min-h-[300px] text-gray-500">
                  <div className="text-center">
                    <svg className="mx-auto mb-4 w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-medium text-lg">Translated YAML will appear here</p>
                    <p className="mt-2 text-sm">Enter your YAML data and upload an Excel file, then click "Process Translation"</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-4 bg-white shadow-md p-4 rounded-lg">
            <ErrorMessage
              message={errorMessage}
              onDismiss={() => setErrorMessage(null)}
            />

            <SuccessMessage
              message={successMessage}
              onDismiss={() => setSuccessMessage(null)}
            />

            <FileUpload
              selectedFile={selectedFile}
              onFileUpload={handleFileUpload}
            />

            <div className="flex justify-center">
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white transition-colors duration-200 ${isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <svg className="mr-3 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Process Translation'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}