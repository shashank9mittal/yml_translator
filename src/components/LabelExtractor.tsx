'use client';

import { useState } from 'react';
import * as yaml from 'js-yaml';

interface LabelExtractorProps {
  value: string;
  onChange: (value: string) => void;
  onExtract: (labels: string[]) => void;
}

export default function LabelExtractor({ value, onChange, onExtract }: LabelExtractorProps) {
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'empty'>('empty');

  const validateAndExtract = (input: string) => {
    if (!input.trim()) {
      setValidationStatus('empty');
      return;
    }

    try {
      let parsedData;
      
      // Parse input (escaped JSON, regular JSON, or YAML)
      if (input.trim().startsWith('"') && input.trim().endsWith('"')) {
        const unescapedString = JSON.parse(input.trim());
        parsedData = JSON.parse(unescapedString);
      } else {
        try {
          parsedData = yaml.load(input);
        } catch (_yamlError) {
          parsedData = JSON.parse(input);
        }
      }

      // Extract labels
      const labels = extractLabelsFromData(parsedData);
      setValidationStatus('valid');
      onExtract(labels);
    } catch (_error) {
      setValidationStatus('invalid');
      onExtract([]);
    }
  };

  const extractLabelsFromData = (data: unknown): string[] => {
    const labels: string[] = [];
    
    const traverse = (obj: unknown) => {
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else if (obj && typeof obj === 'object') {
        const record = obj as Record<string, unknown>;
        if ('label' in record && typeof record.label === 'string') {
          labels.push(record.label);
        }
        Object.values(record).forEach(traverse);
      }
    };
    
    traverse(data);
    return [...new Set(labels)]; // Remove duplicates
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    validateAndExtract(newValue);
  };

  const handleExtractClick = () => {
    validateAndExtract(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="extract-input" className="block font-medium text-gray-700 text-sm">
          YAML/JSON Input
        </label>
        {value.trim() && (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            validationStatus === 'valid' ? 'bg-green-100 text-green-800' :
            validationStatus === 'invalid' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {validationStatus === 'valid' ? '✅ Valid Format' :
             validationStatus === 'invalid' ? '❌ Invalid Format' : 'Empty'}
          </span>
        )}
      </div>
      
      <textarea
        id="extract-input"
        value={value}
        onChange={handleInputChange}
        placeholder='Paste your YAML/JSON here to extract all labels...

Example:
[
  {
    "label": "Home",
    "value": "HOME",
    "actionable": true
  },
  {
    "label": "Settings",
    "options": [
      {
        "label": "Profile",
        "value": "PROFILE"
      }
    ]
  }
]

💡 All "label" fields will be extracted automatically'
        className="bg-white p-3 border border-gray-300 focus:border-transparent rounded-md focus:ring-2 focus:ring-blue-500 w-full h-64 font-mono text-gray-900 text-sm resize-vertical"
      />
      
      <div className="flex justify-center mt-4">
        <button
          onClick={handleExtractClick}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-white transition-colors duration-200"
        >
          Extract Labels
        </button>
      </div>
    </div>
  );
}