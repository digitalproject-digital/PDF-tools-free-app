import React, { useState } from 'react';
import { ToolConfig } from '../types';
import * as Icons from 'lucide-react';

interface ToolViewProps {
  tool: ToolConfig;
  onBack: () => void;
  children: React.ReactNode;
}

const ToolView: React.FC<ToolViewProps> = ({ tool, onBack, children }) => {
  const IconComponent = (Icons as any)[tool.iconName] || Icons.FileText;
  const [activeTab, setActiveTab] = useState(tool.suggestedPages[0] || 'Home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Dynamic Header */}
      <header 
        className="text-white shadow-lg sticky top-0 z-50 transition-colors duration-300"
        style={{ backgroundColor: tool.primaryColor }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-white/20 mx-1"></div>
            <div className="flex items-center gap-2">
              <IconComponent className="w-6 h-6 text-white" />
              <div>
                <h1 className="text-lg font-bold leading-none">{tool.name}</h1>
                <span className="text-xs opacity-90 font-medium">{tool.tagline}</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs (Suggested Pages) */}
          <nav className="hidden md:flex gap-1 bg-black/10 p-1 rounded-lg">
            {tool.suggestedPages.map((page) => (
              <button
                key={page}
                onClick={() => setActiveTab(page)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === page 
                    ? 'bg-white shadow-sm' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ color: activeTab === page ? tool.primaryColor : undefined }}
              >
                {page}
              </button>
            ))}
          </nav>
          
          <div className="md:hidden">
            <Icons.Menu className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-grow container mx-auto px-4 py-6 max-w-6xl">
        {/* Breadcrumb / Title area */}
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-gray-400 font-normal">{activeTab}</span>
            </h2>
            <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                {tool.type.toUpperCase()} MODE
            </div>
        </div>

        {/* Content Injection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px] overflow-hidden flex flex-col">
            {children}
        </div>
      </main>
    </div>
  );
};

export default ToolView;
