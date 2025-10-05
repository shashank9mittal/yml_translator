'use client';

import { useState } from 'react';
import * as yaml from 'js-yaml';

interface YmlInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange: (status: 'valid' | 'invalid' | 'empty', parsedJson: string) => void;
}

export default function YmlInput({ value, onChange, onValidationChange }: YmlInputProps) {
  const [localValidationStatus, setLocalValidationStatus] = useState<'valid' | 'invalid' | 'empty'>('empty');

  const validateAndConvertYml = (input: string) => {
    if (!input.trim()) {
      setLocalValidationStatus('empty');
      onValidationChange('empty', '');
      return;
    }

    try {
      let parsedData;
      let format = '';

      // First check if it's an escaped JSON string (starts and ends with quotes)
      if (input.trim().startsWith('"') && input.trim().endsWith('"')) {
        try {
          // Parse the escaped string first to get the actual JSON string
          const unescapedString = JSON.parse(input.trim());
          // Then parse the unescaped JSON string to get the actual data
          parsedData = JSON.parse(unescapedString);
          format = 'Escaped JSON String';
        } catch (escapedError) {
          setLocalValidationStatus('invalid');
          onValidationChange('invalid', '❌ Invalid escaped JSON string format');
          return;
        }
      } else {
        // Try parsing as regular YAML/JSON
        try {
          parsedData = yaml.load(input);
          format = 'YAML';
        } catch (yamlError) {
          try {
            parsedData = JSON.parse(input);
            format = 'JSON';
          } catch (jsonError) {
            setLocalValidationStatus('invalid');
            onValidationChange('invalid', '❌ Invalid format: Not valid YAML, JSON, or escaped JSON string');
            return;
          }
        }
      }

      setLocalValidationStatus('valid');
      onValidationChange('valid', `✅ Valid ${format} - Converted to JSON:\n\n${JSON.stringify(parsedData, null, 2)}`);
    } catch (error) {
      setLocalValidationStatus('invalid');
      onValidationChange('invalid', '❌ Parsing error: ' + (error as Error).message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    validateAndConvertYml(newValue);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="yml-input" className="block font-medium text-gray-700 text-sm">
          YAML/JSON Configuration
        </label>
        {value.trim() && (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            localValidationStatus === 'valid' ? 'bg-green-100 text-green-800' :
            localValidationStatus === 'invalid' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {localValidationStatus === 'valid' ? '✅ Valid Format' :
             localValidationStatus === 'invalid' ? '❌ Invalid Format' : 'Empty'}
          </span>
        )}
      </div>
      <textarea
        id="yml-input"
        value={value}
        onChange={handleInputChange}
        placeholder='Paste your YAML configuration here...

Example formats supported:

📋 Escaped JSON String:
"[\n {\n \"label\": \"Home\",\n \"value\": \"HOME\",\n \"actionable\": true\n }]"

📄 Regular JSON:
[{"label": "Home", "value": "HOME", "actionable": true}]

🔧 YAML:
- label: Home
  value: HOME
  actionable: true

💡 Tip: Upload an Excel file with translations (Column A: Original labels, Column B: Translated labels)'
        className="bg-white p-3 border border-gray-300 focus:border-transparent rounded-md focus:ring-2 focus:ring-blue-500 w-full h-64 font-mono text-gray-900 text-sm resize-vertical"
      />
    </div>
  );
}