import * as XLSX from 'xlsx';
import * as yaml from 'js-yaml';

export const parseInput = (input: string) => {
  // First check if it's an escaped JSON string
  if (input.trim().startsWith('"') && input.trim().endsWith('"')) {
    try {
      // Parse the escaped string first to get the actual JSON string
      const unescapedString = JSON.parse(input.trim());
      // Then parse the unescaped JSON string to get the actual data
      return JSON.parse(unescapedString);
    } catch (_escapedError) {
      throw new Error('Invalid escaped JSON string format');
    }
  } else {
    // Try parsing as regular YAML/JSON
    try {
      return yaml.load(input);
    } catch (_yamlError) {
      try {
        return JSON.parse(input);
      } catch (_jsonError) {
        throw new Error('Input is neither valid YAML, JSON, nor escaped JSON string format');
      }
    }
  }
};

export const readExcelFile = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
};

export const createTranslationMap = (excelData: unknown[]) => {
  const translationMap: { [key: string]: string } = {};
  excelData.slice(1).forEach((row: unknown) => { // Skip header row
    if (Array.isArray(row) && row[0] && row[1]) { // Column A and Column B
      translationMap[row[0]] = row[1];
    }
  });
  return translationMap;
};

export const translateLabels = (obj: unknown, translationMap: { [key: string]: string }, fieldName: 'label' | 'name' = 'label'): unknown => {
  console.log('Processing object:', typeof obj, obj);

  if (Array.isArray(obj)) {
    console.log('Processing array with', obj.length, 'items');
    return obj.map(item => translateLabels(item, translationMap, fieldName));
  } else if (obj && typeof obj === 'object') {
    console.log('Processing object with keys:', Object.keys(obj));
    const newObj = { ...obj } as Record<string, unknown>;

    if (fieldName in newObj && typeof newObj[fieldName] === 'string') {
      console.log(`Found ${fieldName}:`, JSON.stringify(newObj[fieldName]), 'Type:', typeof newObj[fieldName]);
      console.log('Available translations:', Object.keys(translationMap));

      if (translationMap[newObj[fieldName] as string]) {
        console.log('✅ Translating:', newObj[fieldName], 'to:', translationMap[newObj[fieldName] as string]);
        newObj[fieldName] = translationMap[newObj[fieldName] as string];
      } else {
        console.log('❌ No translation found for:', JSON.stringify(newObj[fieldName]));
        // Check for partial matches
        const exactMatch = Object.keys(translationMap).find(key => key === newObj[fieldName]);
        console.log('Exact match check:', exactMatch);
      }
    }

    // Recursively translate nested objects
    Object.keys(newObj).forEach(key => {
      if (key !== fieldName) {
        newObj[key] = translateLabels(newObj[key], translationMap, fieldName);
      }
    });
    return newObj;
  }
  return obj;
};

export const validateOutput = (output: string): { isValid: boolean; message?: string } => {
  if (!output.trim()) {
    return { isValid: false, message: 'Output is empty' };
  }

  try {
    // First, try to parse the escaped string if it's in that format
    if (output.trim().startsWith('"') && output.trim().endsWith('"')) {
      const unescapedString = JSON.parse(output.trim());
      const parsedData = JSON.parse(unescapedString);
      
      // Validate that it's a proper data structure
      if (parsedData === null || parsedData === undefined) {
        return { isValid: false, message: 'Output contains null or undefined data' };
      }
      
      // Check if it's an array or object (valid YAML structures)
      if (typeof parsedData !== 'object') {
        return { isValid: false, message: 'Output is not a valid YAML structure (must be object or array)' };
      }
      
      return { isValid: true };
    } else {
      // Try parsing as regular JSON
      const parsedData = JSON.parse(output);
      
      if (parsedData === null || parsedData === undefined) {
        return { isValid: false, message: 'Output contains null or undefined data' };
      }
      
      if (typeof parsedData !== 'object') {
        return { isValid: false, message: 'Output is not a valid YAML structure (must be object or array)' };
      }
      
      return { isValid: true };
    }
  } catch (error) {
    return { 
      isValid: false, 
      message: `Invalid output format: ${error instanceof Error ? error.message : 'Unknown parsing error'}` 
    };
  }
};