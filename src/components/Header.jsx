import React from 'react';
import { 
  FileCheck2, 
  Sparkles, 
  Settings2, 
  FolderDown, 
  Target, 
  Printer,
  Pencil,
  Eye,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRESET_PROFILES } from '../data/initialResumeData';

export function Header({
  activeProfileId,
  onSelectPreset,
  atsScore,
  onOpenAtsModal,
  onOpenTailorModal,
  onOpenCustomizer,
  onOpenImportExport,
  onPrint,
  mobileView,
  setMobileView
}) {
  const handlePrintClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.1, x: 0.9 }
      });
    } catch {
      // ignore confetti errors in unsupported environments
    }
    onPrint();
  };

  const getScoreColorClass = (score) => {
    if (score >= 85) return 'score-excellent';
    if (score >= 70) return 'score-good';
    return 'score-needs-work';
  };

  return (
    <header className="rc-header">
      <div className="rc-header-container">
        {/* Brand */}
        <div className="rc-brand-wrap">
          <div className="rc-brand-icon">
            <FileCheck2 size={20} />
          </div>
          <div className="rc-brand-text-col">
            <div className="rc-brand-row">
              <span className="rc-brand-title">ResumeCreator</span>
              <span className="rc-brand-badge">Auto ATS</span>
            </div>
            <p className="rc-brand-tagline">Automated Candidate Resume Generator</p>
          </div>
        </div>

        {/* Center: Profile Switcher (Full buttons on desktop, compact dropdown on tablet/mobile) */}
        <div className="rc-preset-selector-wrap">
          <span className="rc-selector-label">Profile:</span>
          {/* Desktop inline pill buttons */}
          <div className="rc-preset-buttons">
            {PRESET_PROFILES.map(profile => (
              <button
                key={profile.id}
                type="button"
                className={`rc-preset-btn ${activeProfileId === profile.id ? 'active' : ''}`}
                onClick={() => onSelectPreset(profile)}
                title={profile.description}
              >
                <Sparkles size={13} className="sparkle-icon" />
                <span>{profile.name}</span>
              </button>
            ))}
          </div>

          {/* Tablet/Mobile dropdown selector */}
          <div className="rc-preset-dropdown-wrap">
            <Sparkles size={13} className="sparkle-icon" />
            <select
              className="rc-preset-select"
              value={activeProfileId}
              onChange={(e) => {
                const selected = PRESET_PROFILES.find(p => p.id === e.target.value);
                if (selected) onSelectPreset(selected);
              }}
              aria-label="Select Candidate Profile"
            >
              {PRESET_PROFILES.map(profile => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="select-chevron" />
          </div>
        </div>

        {/* Center-Right: Mobile View Toggle (Editor vs Preview) for < 1024px */}
        <div className="rc-view-toggle-bar">
          <button 
            type="button" 
            className={`rc-view-toggle-btn ${mobileView === 'editor' ? 'active' : ''}`}
            onClick={() => setMobileView('editor')}
            aria-label="Switch to Editor"
          >
            <Pencil size={13} />
            <span>Editor</span>
          </button>
          <button 
            type="button" 
            className={`rc-view-toggle-btn ${mobileView === 'preview' ? 'active' : ''}`}
            onClick={() => setMobileView('preview')}
            aria-label="Switch to Live Preview"
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="rc-actions-wrap">
          {/* ATS Score Indicator */}
          <button
            type="button"
            className={`rc-ats-meter-btn ${getScoreColorClass(atsScore)}`}
            onClick={onOpenAtsModal}
            title="View ATS Score & Quality Audit"
          >
            <span className="ats-circle-val">{atsScore}%</span>
            <span className="ats-label">ATS Score</span>
          </button>

          {/* Job Tailor Button */}
          <button 
            type="button"
            className="rc-nav-btn"
            onClick={onOpenTailorModal}
            title="Tailor resume to target job description"
          >
            <Target size={15} />
            <span className="btn-label">Job Tailor</span>
          </button>

          {/* Design / Customizer */}
          <button 
            type="button"
            className="rc-nav-btn"
            onClick={onOpenCustomizer}
            title="Customize Template, Colors & Typography"
          >
            <Settings2 size={15} />
            <span className="btn-label">Design</span>
          </button>

          {/* Import / Export JSON */}
          <button 
            type="button"
            className="rc-nav-btn"
            onClick={onOpenImportExport}
            title="Import or Export Resume JSON"
          >
            <FolderDown size={15} />
            <span className="btn-label">Data</span>
          </button>

          {/* Primary Print / Download PDF */}
          <button 
            type="button"
            className="rc-print-btn"
            onClick={handlePrintClick}
            title="Download PDF or Print Resume"
          >
            <Printer size={16} />
            <span className="btn-label-desktop">Download PDF</span>
            <span className="btn-label-mobile">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}

