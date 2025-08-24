import React, { useState, useEffect } from 'react';
import { Edit3, Settings, Save, Eye, EyeOff } from 'lucide-react';

interface VisualEditorBarProps {
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
  onSave?: () => void;
  onOpenSettings?: () => void;
}

const VisualEditorBar: React.FC<VisualEditorBarProps> = ({
  isEditMode = false,
  onToggleEditMode,
  onSave,
  onOpenSettings
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (connected to Sparti)
    const checkAuth = () => {
      const user = localStorage.getItem('mock_auth_user');
      setIsAuthenticated(!!user);
    };

    checkAuth();
    
    // Listen for auth changes
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Only show the bar if user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left side - Sparti branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <Edit3 className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">Edit with Sparti</span>
          </div>
          
          {isEditMode && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-600 rounded-full">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">Live Edit</span>
            </div>
          )}
        </div>

        {/* Center - Page info */}
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <span>Homepage</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Last saved: just now</span>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Toggle Edit Mode */}
          <button
            onClick={onToggleEditMode}
            className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
              isEditMode 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {isEditMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {isEditMode ? 'Preview' : 'Edit'}
          </button>

          {/* Save Button */}
          {isEditMode && (
            <button
              onClick={onSave}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Save className="w-3 h-3" />
              Save
            </button>
          )}

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1 px-3 py-1 bg-slate-700 text-slate-300 rounded text-sm font-medium hover:bg-slate-600 transition-colors"
          >
            <Settings className="w-3 h-3" />
            Settings
          </button>

          {/* Minimize/Maximize */}
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {isVisible ? '−' : '+'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorBar;
