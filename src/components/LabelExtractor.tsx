'use client';

import { useState } from 'react';
import * as yaml from 'js-yaml';
import Spinner from './Spinner';
import FieldSelector from './FieldSelector';

interface LabelExtractorProps {
  value: string;
  onChange: (value: string) => void;
  onExtract: (labels: string[]) => void;
  selectedField: 'label' | 'name';
  onFieldChange: (field: 'label' | 'name') => void;
}

export default function LabelExtractor({ value, onChange, onExtract, selectedField, onFieldChange }: LabelExtractorProps) {
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'empty'>('empty');
  const [isExtracting, setIsExtracting] = useState(false);

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

      // Extract labels using selected field
      const labels = extractLabelsFromData(parsedData, selectedField);
      setValidationStatus('valid');
      onExtract(labels);
    } catch (_error) {
      setValidationStatus('invalid');
      onExtract([]);
    }
  };

  const extractLabelsFromData = (data: unknown, fieldName: 'label' | 'name'): string[] => {
    const labels: string[] = [];
    
    const traverse = (obj: unknown) => {
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else if (obj && typeof obj === 'object') {
        const record = obj as Record<string, unknown>;
        if (fieldName in record && typeof record[fieldName] === 'string') {
          labels.push(record[fieldName] as string);
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

  const handleExtractClick = async () => {
    setIsExtracting(true);
    // Add a small delay to show the spinner for user feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    validateAndExtract(value);
    setIsExtracting(false);
  };

  const handleFieldChange = (field: 'label' | 'name') => {
    onFieldChange(field);
    // Re-extract with new field if there's input
    if (value.trim()) {
      validateAndExtract(value);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="extract-input" className="block font-medium text-gray-700 text-sm">
          YAML/JSON Input
        </label>
        {value.trim() && (
          <div className="flex items-center space-x-2">
            {isExtracting && <Spinner size="sm" className="text-green-600" />}
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              validationStatus === 'valid' ? 'bg-green-100 text-green-800' :
              validationStatus === 'invalid' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {validationStatus === 'valid' ? '✅ Valid Format' :
               validationStatus === 'invalid' ? '❌ Invalid Format' : 'Empty'}
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <FieldSelector
          selectedField={selectedField}
          onFieldChange={handleFieldChange}
        />
      </div>
      
      <textarea
        id="extract-input"
        value={value}
        onChange={handleInputChange}
        placeholder={`Paste your YAML/JSON here to extract all ${selectedField} fields...

Example:
[
  {
    "${selectedField}": "Home",
    "value": "HOME",
    "actionable": true
  },
  {
    "${selectedField}": "Settings",
    "options": [
      {
        "${selectedField}": "Profile",
        "value": "PROFILE"
      }
    ]
  }
]

💡 All "${selectedField}" fields will be extracted automatically`}
        className="bg-white p-3 border border-gray-300 focus:border-transparent rounded-md focus:ring-2 focus:ring-blue-500 w-full h-64 font-mono text-gray-900 text-sm resize-vertical"
      />
      
      <div className="flex justify-center mt-4">
        <button
          onClick={handleExtractClick}
          disabled={isExtracting}
          className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-white transition-colors duration-200 ${
            isExtracting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isExtracting ? (
            <div className="flex items-center">
              <Spinner size="sm" className="mr-2 text-white" />
              Extracting...
            </div>
          ) : (
            `Extract ${selectedField === 'label' ? 'Labels' : 'Names'}`
          )}
        </button>
      </div>
    </div>
  );
}