import React, { useRef } from 'react';
import { Upload, Camera, ImagePlus } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
      // Reset input to allow re-selecting same file
      e.target.value = '';
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center gap-4 transition-colors hover:border-primary/50">
      <div className="p-4 bg-primary/5 rounded-full">
        <Upload className="w-8 h-8 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-gray-800">Add Photos</h3>
        <p className="text-sm text-gray-500 mt-1">Tap to upload or take a photo</p>
      </div>
      
      <div className="flex gap-3 w-full max-w-xs">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-primary-dark transition-all font-medium shadow-sm active:scale-95"
        >
          <ImagePlus className="w-4 h-4" />
          Gallery
        </button>
        <button 
          onClick={() => cameraInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-primary text-primary py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm active:scale-95"
        >
          <Camera className="w-4 h-4" />
          Camera
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*" 
        multiple 
        onChange={handleFileChange}
      />
      {/* Hidden camera input for mobile support */}
      <input 
        type="file" 
        ref={cameraInputRef}
        className="hidden" 
        accept="image/*" 
        capture="environment"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
