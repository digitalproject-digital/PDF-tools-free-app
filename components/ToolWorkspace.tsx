import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ScannedImage, PDFSettings, ToolConfig } from '../types';
import ImageUploader from './ImageUploader';
import ImageGrid from './ImageGrid';
import { generatePDF } from '../services/pdfService';
import { Download, Loader2, Settings2, Plus, ShieldCheck, PenTool, FileType } from 'lucide-react';

interface ToolWorkspaceProps {
  tool: ToolConfig;
}

const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({ tool }) => {
  // Workspace State
  const [images, setImages] = useState<ScannedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pdfSettings, setPdfSettings] = useState<PDFSettings>({
    pageSize: 'auto',
    orientation: 'portrait',
    quality: 0.8,
    password: ''
  });

  const handleUpload = useCallback((files: File[]) => {
    const newImages: ScannedImage[] = files.map(file => ({
      id: uuidv4(),
      file,
      previewUrl: URL.createObjectURL(file),
      rotation: 0,
      filter: 'none',
      signature: tool.id === 'signflow' // Auto-enable signature mock for SignFlow
    }));
    setImages(prev => [...prev, ...newImages]);
  }, [tool.id]);

  const handleGenerate = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // UX delay
      await generatePDF(images, pdfSettings);
    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  // Feature Flags based on Tool ID
  const canSecure = tool.id === 'securepdf';
  const canCompress = tool.id === 'tinypdf';
  const isOCR = ['image2doc', 'ocright', 'scanwise'].includes(tool.id);
  const isEditor = ['pocketpdf', 'signflow', 'annotatenow'].includes(tool.id);

  return (
    <div className="flex flex-col h-full min-h-[600px]">
      {/* Tool Toolbar */}
      <div className="border-b border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50/50 gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button 
             onClick={() => setShowSettings(!showSettings)}
             className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors flex items-center gap-2 ${showSettings ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}
          >
             <Settings2 className="w-4 h-4" />
             {canCompress ? 'Compression' : 'Page Setup'}
          </button>
          
          {canSecure && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Encryption Mode</span>
              </div>
          )}
          
          {tool.id === 'signflow' && (
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm border border-purple-100 whitespace-nowrap">
                  <PenTool className="w-4 h-4" />
                  <span className="hidden sm:inline">Signature Mode</span>
              </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
            {images.length > 0 && (
                <span className="text-sm text-gray-500 hidden md:inline-block">
                    {images.length} {images.length === 1 ? 'file' : 'files'}
                </span>
            )}
            <button 
              onClick={handleGenerate}
              disabled={images.length === 0 || isGenerating}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-white px-6 py-2.5 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              style={{ backgroundColor: tool.primaryColor }}
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isGenerating ? 'Processing...' : (tool.type === 'converter' ? 'Convert Now' : 'Export PDF')}
            </button>
        </div>
      </div>

      {/* Dynamic Settings Panel */}
      {showSettings && (
          <div className="bg-gray-50 border-b border-gray-200 p-6 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Paper Size</label>
                  <select 
                    value={pdfSettings.pageSize}
                    onChange={(e) => setPdfSettings({...pdfSettings, pageSize: e.target.value as any})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"
                  >
                    <option value="auto">Auto-Fit (Original)</option>
                    <option value="a4">A4 (ISO)</option>
                    <option value="letter">US Letter</option>
                  </select>
               </div>
               
               {/* Conditional Compression Slider */}
               {(canCompress || tool.id === 'photopdf') ? (
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Compression Level: {Math.round(pdfSettings.quality * 100)}%</label>
                      <input 
                          type="range" 
                          min="0.1" 
                          max="1.0" 
                          step="0.1" 
                          value={pdfSettings.quality}
                          onChange={(e) => setPdfSettings({...pdfSettings, quality: parseFloat(e.target.value)})}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Small Size</span>
                          <span>Best Quality</span>
                      </div>
                   </div>
               ) : (
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Orientation</label>
                       <select 
                        value={pdfSettings.orientation}
                        onChange={(e) => setPdfSettings({...pdfSettings, orientation: e.target.value as any})}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"
                      >
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                      </select>
                  </div>
               )}

               {/* Conditional Security Fields */}
               {canSecure && (
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">PDF Password Protection</label>
                      <input 
                          type="password" 
                          placeholder="Set secure password..."
                          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          onChange={(e) => setPdfSettings({...pdfSettings, password: e.target.value})}
                      />
                      <p className="text-[10px] text-gray-500 mt-1">Files are encrypted locally.</p>
                  </div>
               )}

               {/* OCR Metadata Fields */}
               {isOCR && (
                   <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Metadata: Author</label>
                       <input 
                           type="text" 
                           placeholder="Document Author"
                           className="w-full rounded-md border border-gray-300 p-2 text-sm"
                           onChange={(e) => setPdfSettings({...pdfSettings, author: e.target.value})}
                       />
                   </div>
               )}
            </div>
          </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-grow bg-slate-100 p-4 md:p-6 overflow-y-auto">
          {images.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200 max-w-lg w-full transition-all hover:shadow-md">
                      <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                          style={{ backgroundColor: `${tool.primaryColor}15`, color: tool.primaryColor }}
                      >
                          <Plus className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isEditor ? 'Open Document' : isOCR ? 'Add Documents to Scan' : 'Add Files'}
                      </h3>
                      <p className="text-gray-500 mb-8">
                          {tool.type === 'scanner' ? 'Take photos or upload images to begin scanning.' : 
                           tool.type === 'editor' ? 'Upload a page to start editing, signing, or annotating.' :
                           'Drag & drop files here to begin processing.'}
                      </p>
                      <div className="w-full">
                          <ImageUploader onUpload={handleUpload} />
                      </div>
                      
                      {isOCR && (
                          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                             <FileType className="w-4 h-4" />
                             <span>AI Text Extraction Enabled</span>
                          </div>
                      )}
                  </div>
              </div>
          ) : (
              <div className="max-w-6xl mx-auto">
                  <ImageGrid images={images} setImages={setImages} />
                  
                  <div className="mt-8 flex justify-center pb-12">
                      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 inline-flex gap-4">
                          <ImageUploader onUpload={handleUpload} />
                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default ToolWorkspace;