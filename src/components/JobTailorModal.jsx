import React, { useState } from 'react';
import { 
  X, 
  Target, 
  Sparkles, 
  Check, 
  Plus, 
  AlertCircle
} from 'lucide-react';
import { matchJobDescription } from '../utils/atsCalculator';

export function JobTailorModal({ isOpen, onClose, resumeData, onUpdateResumeData, onShowToast }) {
  const [jobText, setJobText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!jobText.trim()) {
      onShowToast('Please paste a job description first', 'warning');
      return;
    }
    const result = matchJobDescription(resumeData, jobText);
    setAnalysis(result);
    onShowToast(`Analyzed! Match score: ${result.matchScore}%`, 'success');
  };

  const handleInjectMissingSkills = () => {
    if (!analysis || analysis.missingKeywords.length === 0) return;

    const updatedSkills = [...resumeData.skills];
    if (updatedSkills.length > 0) {
      const targetCategory = updatedSkills[0];
      const newItems = Array.from(new Set([...targetCategory.items, ...analysis.missingKeywords.map(k => k.toUpperCase())]));
      targetCategory.items = newItems;
    } else {
      updatedSkills.push({
        category: 'Target Job Skills',
        items: analysis.missingKeywords.map(k => k.toUpperCase())
      });
    }

    onUpdateResumeData({
      ...resumeData,
      skills: updatedSkills
    });

    onShowToast(`Added ${analysis.missingKeywords.length} missing keywords to skills!`, 'success');
    // Re-analyze
    const result = matchJobDescription({ ...resumeData, skills: updatedSkills }, jobText);
    setAnalysis(result);
  };

  const sampleJobExample = `We are looking for a Senior Software Engineer with strong experience in React, Next.js, TypeScript, and Node.js. Experience with AWS, Docker, Kubernetes, GraphQL, and PostgreSQL is highly desired. Knowledge of CI/CD pipelines and Agile methodology is required.`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-tailor" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar">
          <div className="modal-title-with-icon">
            <Target size={24} className="text-sky" />
            <div>
              <h3>AI Job Description Matcher & Tailoring Tool</h3>
              <p>Compare candidate credentials with any job posting to identify missing keywords</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="tailor-input-section">
          <div className="rc-label-row">
            <label>Paste Target Job Description (Requirements / Tech Stack):</label>
            <button 
              type="button" 
              className="rc-btn-text-sm"
              onClick={() => setJobText(sampleJobExample)}
            >
              Load Sample Tech Posting
            </button>
          </div>
          <textarea 
            rows={5}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste text from LinkedIn, JobsDB, or company careers page here..."
          />
          <button 
            type="button" 
            className="rc-btn-primary rc-mt-2"
            onClick={handleAnalyze}
          >
            <Sparkles size={15} />
            <span>Scan & Match Keywords</span>
          </button>
        </div>

        {/* Results */}
        {analysis && (
          <div className="tailor-results-container">
            <div className="tailor-score-card">
              <div className="tailor-match-pct">
                <span className="match-num">{analysis.matchScore}%</span>
                <span className="match-sub">Keyword Match</span>
              </div>
              <div className="tailor-match-summary">
                <h4>
                  {analysis.matchScore >= 80 ? '🎯 High Keyword Alignment!' :
                   analysis.matchScore >= 50 ? '⚡ Moderate Alignment' :
                   '⚠ Significant Keyword Gaps Detected'}
                </h4>
                <p>
                  Found {analysis.matchedKeywords.length} matching skills and requirements. 
                  {analysis.missingKeywords.length > 0 && ` ${analysis.missingKeywords.length} key terms are missing.`}
                </p>
              </div>
            </div>

            {/* Matched Keywords */}
            <div className="kw-box matched">
              <h5>
                <Check size={14} className="text-green" />
                <span>Present in Candidate Profile ({analysis.matchedKeywords.length}):</span>
              </h5>
              <div className="kw-tags-list">
                {analysis.matchedKeywords.length > 0 ? (
                  analysis.matchedKeywords.map(kw => (
                    <span key={kw} className="kw-tag green">{kw}</span>
                  ))
                ) : (
                  <span className="text-muted text-sm">No direct keyword overlap found yet.</span>
                )}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="kw-box missing">
              <div className="kw-header-row">
                <h5>
                  <AlertCircle size={14} className="text-amber" />
                  <span>Missing From Candidate Profile ({analysis.missingKeywords.length}):</span>
                </h5>
                {analysis.missingKeywords.length > 0 && (
                  <button 
                    type="button" 
                    className="rc-btn-primary-sm"
                    onClick={handleInjectMissingSkills}
                  >
                    <Plus size={13} />
                    <span>Auto-Inject Missing Skills</span>
                  </button>
                )}
              </div>
              <div className="kw-tags-list">
                {analysis.missingKeywords.length > 0 ? (
                  analysis.missingKeywords.map(kw => (
                    <span key={kw} className="kw-tag amber">{kw}</span>
                  ))
                ) : (
                  <span className="text-green text-sm font-semibold">
                    ✓ All scanned tech stack requirements are present in your resume!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
