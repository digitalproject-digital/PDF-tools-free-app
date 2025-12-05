import React from 'react';
import { Shield, FileText, Mail, Info } from 'lucide-react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-lg text-primary">
                <FileText className="w-5 h-5" />
              </span>
              PDF Utility Suite
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Your comprehensive, secure, and free online toolkit for all PDF tasks. 
              We process files locally in your browser ensuring maximum privacy. 
              No server uploads, no data storage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-primary transition-colors">All Tools</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-primary transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-primary transition-colors">Contact Support</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal & Policy</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-primary transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-primary transition-colors">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} PDF Utility Suite. All rights reserved.
          </p>
          <div className="flex gap-4">
             <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Shield className="w-3 h-3" /> Secure & Local Processing
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;