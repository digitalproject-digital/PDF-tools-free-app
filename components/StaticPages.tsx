import React from 'react';
import { ArrowLeft, Mail, CheckCircle, Shield, Scale } from 'lucide-react';

export const PageLayout: React.FC<{ title: string; children: React.ReactNode; onBack: () => void }> = ({ title, children, onBack }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-4xl flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
    <div className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 prose prose-slate max-w-none">
        {children}
      </div>
    </div>
  </div>
);

export const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <PageLayout title="About Us" onBack={onBack}>
    <p className="lead text-xl text-gray-600 mb-8">
      We are dedicated to making document management accessible, secure, and free for everyone.
    </p>
    
    <h3>Our Mission</h3>
    <p>
      In a world where digital documentation is essential, we believe specialized tools shouldn't come with a high price tag or privacy risks. 
      PDF Utility Suite was built to provide professional-grade features—OCR, merging, signing, and encryption—directly in your browser.
    </p>

    <h3>Why Choose Us?</h3>
    <ul className="space-y-6 list-none pl-0 mt-8">
      <li className="flex items-start gap-4">
        <div className="bg-green-100 p-2 rounded-lg text-green-600 mt-1">
            <Shield className="w-6 h-6" />
        </div>
        <div>
            <strong className="text-lg text-gray-900 block mb-1">100% Client-Side Processing</strong>
            <p className="m-0 text-gray-500">Your files never leave your device. We use advanced WebAssembly and HTML5 technologies to process everything locally in your browser.</p>
        </div>
      </li>
      <li className="flex items-start gap-4">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1">
            <CheckCircle className="w-6 h-6" />
        </div>
        <div>
            <strong className="text-lg text-gray-900 block mb-1">No Sign-Ups Required</strong>
            <p className="m-0 text-gray-500">Jump straight into work. No accounts, no newsletters, no friction. Just open the tool and get started.</p>
        </div>
      </li>
    </ul>
  </PageLayout>
);

export const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <PageLayout title="Contact Support" onBack={onBack}>
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
      <div className="bg-blue-100 p-4 rounded-full text-blue-600">
        <Mail className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-blue-900 mb-2">Email Support</h3>
        <p className="text-blue-700 mb-4">Have a question or found a bug? We'd love to hear from you.</p>
        <a href="mailto:support@pdfutilitysuite.com" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          support@pdfutilitysuite.com
        </a>
      </div>
    </div>

    <h3>Frequently Asked Questions</h3>
    <div className="space-y-8 mt-8">
        <div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Is this really free?</h4>
            <p className="text-gray-600">Yes! The current version is supported by our open-source initiative. We may introduce premium features later, but the core tools will remain free.</p>
        </div>
        <div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Where are my files stored?</h4>
            <p className="text-gray-600">Nowhere. Your files are processed in your browser's memory and are discarded as soon as you close the tab. We cannot see them.</p>
        </div>
    </div>
  </PageLayout>
);

export const PrivacyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <PageLayout title="Privacy Policy" onBack={onBack}>
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
      <p className="text-sm text-amber-800 m-0 font-medium">
        Last Updated: October 25, 2023
      </p>
    </div>
    
    <h3>1. Data Collection</h3>
    <p>
      We operate with a strict <strong>Privacy-First</strong> approach. Since our application runs client-side (in your browser):
    </p>
    <ul>
      <li>We <strong>do not</strong> upload your documents to any server.</li>
      <li>We <strong>do not</strong> store copies of your generated PDFs.</li>
      <li>We <strong>do not</strong> collect personal information such as names or emails unless you voluntarily contact support.</li>
    </ul>

    <h3>2. Local Storage</h3>
    <p>
      The app may use your browser's LocalStorage to save user preferences (like your last used theme or settings). This data never leaves your device.
    </p>

    <h3>3. Third-Party Services</h3>
    <p>
      We use standard analytics (e.g., Google Analytics) to track aggregate usage patterns (page views, tool popularity) to improve the app. No personally identifiable information is attached to this data.
    </p>
  </PageLayout>
);

export const TermsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <PageLayout title="Terms of Service" onBack={onBack}>
    <div className="flex items-center gap-3 mb-8 text-gray-500">
        <Scale className="w-5 h-5" />
        <span>Please read these terms carefully before using our service.</span>
    </div>

    <h3>1. Acceptance of Terms</h3>
    <p>
      By accessing and using PDF Utility Suite, you accept and agree to be bound by the terms and provision of this agreement.
    </p>

    <h3>2. Use License</h3>
    <p>
      Permission is granted to temporarily use the materials (information or software) on PDF Utility Suite's website for personal, non-commercial transitory viewing only.
    </p>
    <ul>
        <li>You may not modify or copy the materials for commercial resale.</li>
        <li>You may not attempt to decompile or reverse engineer any software contained on the website.</li>
    </ul>

    <h3>3. Disclaimer</h3>
    <p>
      The materials on PDF Utility Suite's website are provided "as is". PDF Utility Suite makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
    </p>

    <h3>4. Limitations</h3>
    <p>
      In no event shall PDF Utility Suite or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PDF Utility Suite's website.
    </p>
  </PageLayout>
);