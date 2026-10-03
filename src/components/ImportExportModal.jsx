import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  FileJson, 
  FileText, 
  RotateCcw
} from 'lucide-react';
import { INITIAL_RESUME_DATA } from '../data/initialResumeData';

export function ImportExportModal({ 
  isOpen, 
  onClose, 
  resumeData, 
  onUpdateResumeData, 
  onShowToast 
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Export JSON file
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = (resumeData.personal.fullName || 'resume').toLowerCase().replace(/\s+/g, '-');
    a.href = url;
    a.download = `${safeName}-resume-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('Resume profile downloaded as JSON', 'success');
  };

  // Import JSON file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.personal && parsed.experience) {
          onUpdateResumeData(parsed);
          onShowToast('Resume profile successfully imported!', 'success');
          onClose();
        } else {
          onShowToast('Invalid resume JSON structure', 'warning');
        }
      } catch {
        onShowToast('Failed to parse JSON file', 'warning');
      }
    };
    reader.readAsText(file);
  };

  // Copy Plain Text ATS Format
  const handleCopyPlainText = () => {
    const { personal, experience, education, skills, projects } = resumeData;
    let text = `${personal.fullName || ''}\n${personal.targetRole || ''}\n`;
    text += `Email: ${personal.email || ''} | Phone: ${personal.phone || ''} | Location: ${personal.location || ''}\n`;
    if (personal.linkedin) text += `LinkedIn: ${personal.linkedin} | GitHub: ${personal.github || ''}\n`;
    text += `\n=========================================\nPROFESSIONAL SUMMARY\n=========================================\n`;
    text += `${personal.summary || ''}\n\n`;

    text += `=========================================\nTECHNICAL SKILLS\n=========================================\n`;
    skills.forEach(cat => {
      text += `${cat.category}: ${cat.items.join(', ')}\n`;
    });
    text += '\n';

    text += `=========================================\nWORK EXPERIENCE\n=========================================\n`;
    experience.forEach(exp => {
      text += `${exp.role} - ${exp.company} (${exp.location})\n`;
      text += `${exp.startDate} - ${exp.endDate}\n`;
      (exp.highlights || []).forEach(h => {
        text += `• ${h}\n`;
      });
      text += '\n';
    });

    text += `=========================================\nEDUCATION\n=========================================\n`;
    education.forEach(edu => {
      text += `${edu.degree} in ${edu.field} - ${edu.school} (${edu.graduationYear})\n`;
      if (edu.achievements) text += `Note: ${edu.achievements}\n`;
      text += '\n';
    });

    if (projects && projects.length > 0) {
      text += `=========================================\nKEY PROJECTS\n=========================================\n`;
      projects.forEach(proj => {
        text += `${proj.title} (${(proj.techStack || []).join(', ')})\n`;
        text += `${proj.description}\n\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    onShowToast('Plain-text ATS resume copied to clipboard!', 'success');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all fields to the default sample template?')) {
      onUpdateResumeData(INITIAL_RESUME_DATA);
      onShowToast('Reset to default profile');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-data" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar">
          <div className="modal-title-with-icon">
            <FileJson size={24} className="text-sky" />
            <div>
              <h3>Data Management & Profile Portability</h3>
              <p>Save backups, restore previous profiles, or copy ATS raw text</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="data-options-grid">
          {/* Card 1: Download JSON */}
          <div className="data-card">
            <div className="data-card-icon">
              <Download size={24} className="text-sky" />
            </div>
            <h4>Backup Resume JSON</h4>
            <p>Save your entire candidate profile as a local JSON file to restore anytime.</p>
            <button 
              type="button" 
              className="rc-btn-primary-sm rc-mt-auto"
              onClick={handleExportJSON}
            >
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Card 2: Upload JSON */}
          <div className="data-card">
            <div className="data-card-icon">
              <Upload size={24} className="text-green" />
            </div>
            <h4>Restore from Backup</h4>
            <p>Load an existing JSON profile into the interactive editor.</p>
            <label className="rc-upload-btn-label rc-mt-auto">
              <span>Choose JSON File</span>
              <input 
                type="file" 
                accept=".json"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {/* Card 3: Copy ATS Plaintext */}
          <div className="data-card">
            <div className="data-card-icon">
              <FileText size={24} className="text-purple" />
            </div>
            <h4>Copy ATS Plain Text</h4>
            <p>Unformatted plain text optimal for copying into corporate job application portals.</p>
            <button 
              type="button" 
              className="rc-btn-secondary-sm rc-mt-auto"
              onClick={handleCopyPlainText}
            >
              {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Plaintext'}</span>
            </button>
          </div>
        </div>

        {/* Reset button at bottom */}
        <div className="modal-danger-strip rc-mt-4">
          <button 
            type="button" 
            className="rc-btn-ghost-danger"
            onClick={handleResetToDefault}
          >
            <RotateCcw size={14} />
            <span>Reset All Data to Default Template</span>
          </button>
        </div>
      </div>
    </div>
  );
}
