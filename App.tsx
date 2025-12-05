import React, { useState } from 'react';
import { ToolConfig, ViewType } from './types';
import Dashboard from './components/Dashboard';
import ToolView from './components/ToolView';
import ToolWorkspace from './components/ToolWorkspace';
import Footer from './components/Footer';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './components/StaticPages';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [activeTool, setActiveTool] = useState<ToolConfig | null>(null);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleToolSelect = (tool: ToolConfig) => {
    setActiveTool(tool);
    navigateTo('tool');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onSelectTool={handleToolSelect} />;
      
      case 'tool':
        if (!activeTool) return <Dashboard onSelectTool={handleToolSelect} />;
        return (
          <ToolView tool={activeTool} onBack={() => navigateTo('dashboard')}>
            <ToolWorkspace tool={activeTool} />
          </ToolView>
        );

      case 'about':
        return <AboutPage onBack={() => navigateTo('dashboard')} />;
      
      case 'contact':
        return <ContactPage onBack={() => navigateTo('dashboard')} />;
      
      case 'privacy':
        return <PrivacyPage onBack={() => navigateTo('dashboard')} />;
      
      case 'terms':
        return <TermsPage onBack={() => navigateTo('dashboard')} />;
      
      default:
        return <Dashboard onSelectTool={handleToolSelect} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-slate-50">
      {/* Main Content Area */}
      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Global Footer (only show on dashboard or static pages to avoid double scrolling in tool view) */}
      {currentView !== 'tool' && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
}

export default App;