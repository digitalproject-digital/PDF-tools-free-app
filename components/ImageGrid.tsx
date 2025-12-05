import React from 'react';
import { ScannedImage } from '../types';
import { X, RotateCw, Sparkles, Wand2, Type } from 'lucide-react';
import { extractTextFromImage } from '../services/geminiService';

interface ImageGridProps {
  images: ScannedImage[];
  setImages: React.Dispatch<React.SetStateAction<ScannedImage[]>>;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, setImages }) => {

  const removeImage = (id: string) => {
    setImages(prev => {
        const newImages = prev.filter(img => img.id !== id);
        // Clean up object URLs to avoid memory leaks
        const removed = prev.find(img => img.id === id);
        if (removed) URL.revokeObjectURL(removed.previewUrl);
        return newImages;
    });
  };

  const rotateImage = (id: string) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
    ));
  };

  const toggleFilter = (id: string) => {
    setImages(prev => prev.map(img => {
      if (img.id !== id) return img;
      const nextFilter = img.filter === 'none' ? 'grayscale' : img.filter === 'grayscale' ? 'bw' : 'none';
      return { ...img, filter: nextFilter };
    }));
  };

  const analyzeImage = async (id: string) => {
    const image = images.find(img => img.id === id);
    if (!image || image.isAnalyzing) return;

    setImages(prev => prev.map(img => img.id === id ? { ...img, isAnalyzing: true } : img));

    try {
        // We need the base64 data. Fetch blob and convert.
        const response = await fetch(image.previewUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            try {
                const text = await extractTextFromImage(base64, blob.type);
                setImages(prev => prev.map(img => 
                    img.id === id ? { ...img, extractedText: text, isAnalyzing: false } : img
                ));
            } catch (err) {
                 setImages(prev => prev.map(img => 
                    img.id === id ? { ...img, extractedText: "Failed to extract text.", isAnalyzing: false } : img
                ));
            }
        };
        reader.readAsDataURL(blob);

    } catch (e) {
        console.error(e);
        setImages(prev => prev.map(img => img.id === id ? { ...img, isAnalyzing: false } : img));
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {images.map((img, index) => (
        <div key={img.id} className="relative group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {/* Image Preview Container */}
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                <img 
                    src={img.previewUrl} 
                    alt={`Scan ${index + 1}`}
                    className="w-full h-full object-contain transition-transform duration-300"
                    style={{ 
                        transform: `rotate(${img.rotation}deg)`,
                        filter: img.filter === 'grayscale' ? 'grayscale(100%)' : img.filter === 'bw' ? 'grayscale(100%) contrast(150%)' : 'none'
                    }}
                />
                
                {/* Overlay Badge for Filter */}
                {img.filter !== 'none' && (
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                        {img.filter === 'bw' ? 'B&W' : 'Gray'}
                    </div>
                )}

                {/* Remove Button */}
                <button 
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* AI Text Analysis Result */}
            {img.extractedText && (
                <div className="p-2 bg-indigo-50 border-b border-indigo-100 text-xs text-indigo-900 max-h-20 overflow-y-auto">
                    <span className="font-bold block mb-1">AI Extracted Text:</span>
                    {img.extractedText}
                </div>
            )}

            {/* Controls */}
            <div className="p-2 flex items-center justify-around bg-white border-t border-gray-100">
                <button 
                    onClick={() => rotateImage(img.id)}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors flex flex-col items-center gap-1"
                    title="Rotate"
                >
                    <RotateCw className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => toggleFilter(img.id)}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    title="Filter"
                >
                    <Wand2 className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => analyzeImage(img.id)}
                    className={`p-2 rounded-lg transition-colors ${img.isAnalyzing ? 'animate-pulse text-indigo-400' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'}`}
                    disabled={img.isAnalyzing}
                    title="Analyze with AI"
                >
                    {img.isAnalyzing ? <Sparkles className="w-5 h-5" /> : <Type className="w-5 h-5" />}
                </button>
            </div>
            
            <div className="absolute bottom-[3.25rem] left-0 w-full h-1 bg-gray-100">
                <div className="h-full bg-primary" style={{ width: '100%' }}></div>
            </div>
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md backdrop-blur-md font-mono">
                #{index + 1}
            </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
