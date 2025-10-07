interface FieldSelectorProps {
  selectedField: 'label' | 'name';
  onFieldChange: (field: 'label' | 'name') => void;
  className?: string;
}

export default function FieldSelector({ selectedField, onFieldChange, className = '' }: FieldSelectorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor="field-selector" className="font-medium text-gray-700 text-sm">
        Extract Field:
      </label>
      <select
        id="field-selector"
        value={selectedField}
        onChange={(e) => onFieldChange(e.target.value as 'label' | 'name')}
        className="bg-white px-3 py-1 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
      >
        <option value="label" className="bg-white text-gray-900">label</option>
        <option value="name" className="bg-white text-gray-900">name</option>
      </select>
    </div>
  );
}