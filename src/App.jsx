import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { EditorPanel } from './components/EditorPanel';
import { ResumePreview } from './components/ResumePreview';
import { AtsScoreModal } from './components/AtsScoreModal';
import { JobTailorModal } from './components/JobTailorModal';
import { TemplateCustomizer } from './components/TemplateCustomizer';
import { ImportExportModal } from './components/ImportExportModal';

import { INITIAL_RESUME_DATA, PRESET_PROFILES } from './data/initialResumeData';
import { COLOR_THEMES, FONT_OPTIONS, SPACING_OPTIONS } from './data/templateThemes';
import { calculateAtsScore } from './utils/atsCalculator';

import './App.css';
import { 
  BellRing, 
  Pencil, 
  Eye, 
  ShieldCheck, 
  Palette, 
  Printer, 
  Target, 
  FolderDown 
} from 'lucide-react';

export default function App() {
  // Candidate Resume Data with localStorage persistence
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumecreator_data');
      return saved ? JSON.parse(saved) : INITIAL_RESUME_DATA;
    } catch {
      return INITIAL_RESUME_DATA;
    }
  });

  // Active loaded preset ID tracker
  const [activeProfileId, setActiveProfileId] = useState(PRESET_PROFILES[0].id);

  // Responsive mobile view mode: 'editor' | 'preview'
  const [mobileView, setMobileView] = useState('editor');

  // Template Customization Settings
  const [activeTemplateId, setActiveTemplateId] = useState('modern');
  const [activeColorThemeId, setActiveColorThemeId] = useState('sapphire');
  const [activeFontId, setActiveFontId] = useState('jakarta');
  const [activeSpacingId, setActiveSpacingId] = useState('normal');

  // Modals state
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  // Toast Notification state
  const [notification, setNotification] = useState(null);

  // Persist resume data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resumecreator_data', JSON.stringify(resumeData));
    } catch {
      // storage unavailable
    }
  }, [resumeData]);

  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Preset profile selector
  const handleSelectPreset = (profile) => {
    setActiveProfileId(profile.id);
    setResumeData(profile.data);
    showToast(`Loaded candidate profile: ${profile.name}`, 'success');
  };

  // Real-time ATS Score calculation
  const atsAnalysis = useMemo(() => {
    return calculateAtsScore(resumeData);
  }, [resumeData]);

  // Selected design tokens
  const activeColorTheme = useMemo(() => {
    return COLOR_THEMES.find(c => c.id === activeColorThemeId) || COLOR_THEMES[0];
  }, [activeColorThemeId]);

  const activeFont = useMemo(() => {
    return FONT_OPTIONS.find(f => f.id === activeFontId) || FONT_OPTIONS[0];
  }, [activeFontId]);

  const activeSpacing = useMemo(() => {
    return SPACING_OPTIONS.find(s => s.id === activeSpacingId) || SPACING_OPTIONS[1];
  }, [activeSpacingId]);

  // Trigger print / PDF generation
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rc-app-shell">
      {/* Toast Notification */}
      {notification && (
        <div className={`rc-toast rc-toast-${notification.type}`}>
          <BellRing size={16} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Header */}
      <Header 
        activeProfileId={activeProfileId}
        onSelectPreset={handleSelectPreset}
        atsScore={atsAnalysis.score}
        onOpenAtsModal={() => setIsAtsModalOpen(true)}
        onOpenTailorModal={() => setIsTailorModalOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onPrint={handlePrint}
        mobileView={mobileView}
        setMobileView={setMobileView}
      />

      {/* Main Dual-Pane Workspace with Responsive View Mode */}
      <main className={`rc-workspace-main mobile-view-${mobileView}`}>
        {/* Left Interactive Form Editor */}
        <EditorPanel 
          resumeData={resumeData}
          onUpdateResumeData={setResumeData}
          onShowToast={showToast}
        />

        {/* Right Live Resume Preview */}
        <ResumePreview 
          resumeData={resumeData}
          templateId={activeTemplateId}
          colorTheme={activeColorTheme}
          fontOption={activeFont}
          spacingOption={activeSpacing}
          onPrint={handlePrint}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onSwitchToEditor={() => setMobileView('editor')}
        />
      </main>

      {/* Mobile Bottom Dock Navigation (visible on mobile screens <= 768px) */}
      <nav className="rc-mobile-dock" aria-label="Mobile Bottom Navigation">
        <button 
          type="button"
          className={`rc-dock-item ${mobileView === 'editor' ? 'active' : ''}`}
          onClick={() => setMobileView('editor')}
          aria-label="Editor View"
        >
          <Pencil size={18} />
          <span>Editor</span>
        </button>

        <button 
          type="button"
          className={`rc-dock-item ${mobileView === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileView('preview')}
          aria-label="Preview View"
        >
          <Eye size={18} />
          <span>Preview</span>
        </button>

        <button 
          type="button"
          className="rc-dock-item"
          onClick={() => setIsAtsModalOpen(true)}
          aria-label="ATS Score Audit"
        >
          <ShieldCheck size={18} className="dock-icon-shield" />
          <span className="dock-label-score">{atsAnalysis.score}%</span>
        </button>

        <button 
          type="button"
          className="rc-dock-item"
          onClick={() => setIsCustomizerOpen(true)}
          aria-label="Customize Design"
        >
          <Palette size={18} />
          <span>Design</span>
        </button>

        <button 
          type="button"
          className="rc-dock-item"
          onClick={() => setIsTailorModalOpen(true)}
          aria-label="Job Tailor"
        >
          <Target size={18} />
          <span>Tailor</span>
        </button>

        <button 
          type="button"
          className="rc-dock-item"
          onClick={() => setIsImportExportOpen(true)}
          aria-label="Data Backup"
        >
          <FolderDown size={18} />
          <span>Data</span>
        </button>

        <button 
          type="button"
          className="rc-dock-item rc-dock-item-primary"
          onClick={handlePrint}
          aria-label="Download PDF"
        >
          <Printer size={18} />
          <span>PDF</span>
        </button>
      </nav>

      {/* Modals & Dialogs */}
      <AtsScoreModal 
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        atsAnalysis={atsAnalysis}
        onOpenTailorModal={() => setIsTailorModalOpen(true)}
      />

      <JobTailorModal 
        isOpen={isTailorModalOpen}
        onClose={() => setIsTailorModalOpen(false)}
        resumeData={resumeData}
        onUpdateResumeData={setResumeData}
        onShowToast={showToast}
      />

      <TemplateCustomizer 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        activeTemplateId={activeTemplateId}
        onSelectTemplate={setActiveTemplateId}
        activeColorThemeId={activeColorThemeId}
        onSelectColorTheme={setActiveColorThemeId}
        activeFontId={activeFontId}
        onSelectFont={setActiveFontId}
        activeSpacingId={activeSpacingId}
        onSelectSpacing={setActiveSpacingId}
      />

      <ImportExportModal 
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        resumeData={resumeData}
        onUpdateResumeData={setResumeData}
        onShowToast={showToast}
      />
    </div>
  );
}

