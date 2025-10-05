interface TabNavigationProps {
  activeTab: 'translate' | 'extract';
  onTabChange: (tab: 'translate' | 'extract') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-6 border-gray-200 border-b">
      <nav className="flex space-x-8 -mb-px" aria-label="Tabs">
        <button
          onClick={() => onTabChange('translate')}
          className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'translate'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          aria-current={activeTab === 'translate' ? 'page' : undefined}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Translate YAML</span>
          </div>
        </button>
        
        <button
          onClick={() => onTabChange('extract')}
          className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'extract'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          aria-current={activeTab === 'extract' ? 'page' : undefined}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Extract Labels</span>
          </div>
        </button>
      </nav>
    </div>
  );
}