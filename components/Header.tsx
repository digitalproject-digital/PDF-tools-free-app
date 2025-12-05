import React from 'react';
import { Camera, FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Snap2PDF</h1>
            <p className="text-xs text-primary-100 opacity-90">Photo → PDF in one tap</p>
          </div>
        </div>
        <a 
          href="#" 
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="About"
        >
           <FileText className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};

export default Header;
