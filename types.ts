export interface ScannedImage {
  id: string;
  file: File;
  previewUrl: string;
  rotation: number; // 0, 90, 180, 270
  filter: 'none' | 'grayscale' | 'bw';
  extractedText?: string;
  isAnalyzing?: boolean;
  signature?: boolean; // Mock signature overlay
}

export interface PDFSettings {
  pageSize: 'a4' | 'letter' | 'auto';
  orientation: 'portrait' | 'landscape';
  quality: number;
  password?: string;
  author?: string;
  title?: string;
  subject?: string;
}

export interface ToolConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  primaryColor: string;
  iconName: string; // strict mapping to Lucide icons
  features: string[];
  suggestedPages: string[];
  type: 'converter' | 'editor' | 'scanner' | 'utility';
}

export type ViewType = 'dashboard' | 'tool' | 'about' | 'contact' | 'privacy' | 'terms';