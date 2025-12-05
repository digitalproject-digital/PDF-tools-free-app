import { ToolConfig } from '../types';

export const TOOLS: ToolConfig[] = [
  {
    id: 'snap2pdf',
    name: 'Snap2PDF',
    tagline: 'Photo → PDF in one tap',
    description: 'Mobile-first app for turning photos into clean PDFs.',
    primaryColor: '#0ea5a4',
    iconName: 'Camera',
    features: ['Auto-crop', 'Batch processing', 'Filters'],
    suggestedPages: ['Camera', 'Gallery', 'Edit', 'Export'],
    type: 'scanner'
  },
  {
    id: 'pdffusion',
    name: 'PDFFusion Pro',
    tagline: 'Merge. Edit. Master.',
    description: 'All-in-one editor for merging and reordering pages.',
    primaryColor: '#1e3a8a',
    iconName: 'Files',
    features: ['Merge', 'Split', 'Reorder'],
    suggestedPages: ['Dashboard', 'Merge Tool', 'Settings'],
    type: 'editor'
  },
  {
    id: 'photopdf',
    name: 'PhotoPDF Studio',
    tagline: 'Studio-level image → PDF',
    description: 'Focus on image quality, filters and enhancement.',
    primaryColor: '#ff6b6b',
    iconName: 'Aperture',
    features: ['Color correction', 'Deskew', 'High DPI'],
    suggestedPages: ['Upload', 'Enhance', 'Export'],
    type: 'converter'
  },
  {
    id: 'quickpdf',
    name: 'QuickPDF Maker',
    tagline: 'Create PDFs fast',
    description: 'Lightning-fast interface for quick conversions.',
    primaryColor: '#f59e0b',
    iconName: 'Zap',
    features: ['Drag-drop', 'Instant Convert', 'Templates'],
    suggestedPages: ['Convert', 'History'],
    type: 'converter'
  },
  {
    id: 'scanwise',
    name: 'ScanWise PDF',
    tagline: 'Smart scanning, smarter PDFs',
    description: 'Advanced scanning with document detection.',
    primaryColor: '#10b981',
    iconName: 'Scan',
    features: ['Smart Stitch', 'Doc Detection', 'Cloud'],
    suggestedPages: ['Scanner', 'Cloud Sync'],
    type: 'scanner'
  },
  {
    id: 'image2doc',
    name: 'Image2Doc PDF',
    tagline: 'Photos to searchable PDFs',
    description: 'Photo to searchable PDF including OCR.',
    primaryColor: '#7c3aed',
    iconName: 'Search',
    features: ['OCR', 'Searchable Text', 'Metadata'],
    suggestedPages: ['Upload', 'OCR Settings', 'Export'],
    type: 'converter'
  },
  {
    id: 'pocketpdf',
    name: 'PocketPDF Editor',
    tagline: 'PDF editing on the go',
    description: 'Lightweight editor to annotate and sign.',
    primaryColor: '#0f172a',
    iconName: 'PenTool',
    features: ['Annotate', 'Sign', 'Forms'],
    suggestedPages: ['Editor', 'Sign', 'Share'],
    type: 'editor'
  },
  {
    id: 'mergemate',
    name: 'MergeMate PDF',
    tagline: 'Merge smarter',
    description: 'Specialized merger with smart rules.',
    primaryColor: '#334155',
    iconName: 'Puzzle',
    features: ['Smart Merge', 'Bookmarks', 'Batch'],
    suggestedPages: ['Queue', 'Rules', 'Preview'],
    type: 'utility'
  },
  {
    id: 'ocright',
    name: 'OCRight PDF',
    tagline: 'Accurate OCR, fast',
    description: 'High-accuracy OCR engine for text extraction.',
    primaryColor: '#b91c1c',
    iconName: 'Type',
    features: ['Multi-language', 'Text Layer', 'Export'],
    suggestedPages: ['Upload', 'Extraction', 'Results'],
    type: 'converter'
  },
  {
    id: 'tinypdf',
    name: 'TinyPDF Compress',
    tagline: 'Shrink PDFs instantly',
    description: 'Focused tool to compress PDFs with quality presets.',
    primaryColor: '#fb923c',
    iconName: 'Minimize2',
    features: ['Compression', 'Quality Control', 'Batch'],
    suggestedPages: ['Dropzone', 'Presets', 'Download'],
    type: 'utility'
  },
  {
    id: 'signflow',
    name: 'SignFlow PDF',
    tagline: 'Sign & send in seconds',
    description: 'E-signature workflow tool.',
    primaryColor: '#06b6d4',
    iconName: 'Feather',
    features: ['Signatures', 'Templates', 'Audit'],
    suggestedPages: ['Templates', 'Sign', 'History'],
    type: 'editor'
  },
  {
    id: 'annotatenow',
    name: 'AnnotateNow PDF',
    tagline: 'Annotate, teach, collaborate',
    description: 'Real-time annotation for education and teams.',
    primaryColor: '#4f46e5',
    iconName: 'MessageSquare',
    features: ['Comments', 'Drawing', 'Notes'],
    suggestedPages: ['Workspace', 'Comments'],
    type: 'editor'
  },
  {
    id: 'cloudpocket',
    name: 'CloudPocket PDF',
    tagline: 'Your PDFs, everywhere',
    description: 'Cloud-first PDF manager and sync.',
    primaryColor: '#60a5fa',
    iconName: 'Cloud',
    features: ['Sync', 'Tags', 'Secure Links'],
    suggestedPages: ['Library', 'Shared'],
    type: 'utility'
  },
  {
    id: 'scanbatch',
    name: 'ScanBatch Pro',
    tagline: 'Batch scanning, zero hassle',
    description: 'High-volume mobile scanning tool.',
    primaryColor: '#065f46',
    iconName: 'Layers',
    features: ['Batch Capture', 'Auto-name', 'Bulk Upload'],
    suggestedPages: ['Queue', 'Logs'],
    type: 'scanner'
  },
  {
    id: 'securepdf',
    name: 'SecurePDF Vault',
    tagline: 'Encrypt. Store. Share.',
    description: 'Security-first PDF vault with encryption.',
    primaryColor: '#0b132b',
    iconName: 'Lock',
    features: ['Encryption', 'Passwords', 'Expiry'],
    suggestedPages: ['Vault', 'Protect', 'Share'],
    type: 'utility'
  }
];
