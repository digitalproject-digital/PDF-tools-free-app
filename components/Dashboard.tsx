import React from 'react';
import { TOOLS } from '../data/tools';
import { ToolConfig } from '../types';
import * as Icons from 'lucide-react';

interface DashboardProps {
  onSelectTool: (tool: ToolConfig) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectTool }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Utility Suite</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          15 powerful tools to manage, edit, and convert your documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TOOLS.map((tool) => {
          // Dynamic Icon Rendering
          const IconComponent = (Icons as any)[tool.iconName] || Icons.FileText;
          
          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className="flex flex-col text-left h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group overflow-hidden"
            >
              <div 
                className="h-2 w-full"
                style={{ backgroundColor: tool.primaryColor }}
              />
              <div className="p-6 flex flex-col flex-grow">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: `${tool.primaryColor}15`, color: tool.primaryColor }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm font-medium opacity-80 mb-3" style={{ color: tool.primaryColor }}>
                  {tool.tagline}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 flex-grow">
                  {tool.description}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.features.slice(0, 2).map((feature, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-gray-50 text-gray-500"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-16 text-center border-t border-gray-200 pt-8">
        <p className="text-gray-400 text-sm">Select a tool to begin. All processing happens locally in your browser.</p>
      </div>
    </div>
  );
};

export default Dashboard;
