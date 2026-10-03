import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function AtsScoreModal({ isOpen, onClose, atsAnalysis, onOpenTailorModal }) {
  if (!isOpen) return null;

  const { score, breakdown, suggestions, totalSkillsCount, hasMetrics, hasActionVerbs } = atsAnalysis;

  const getScoreColor = (sc) => {
    if (sc >= 85) return '#10b981'; // emerald
    if (sc >= 70) return '#3b82f6'; // blue
    return '#f59e0b'; // amber
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-ats" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="ats-modal-header">
          <div className="ats-modal-title-wrap">
            <ShieldCheck size={26} className="text-sky" />
            <div>
              <h3>ATS Optimization Audit & Resume Score</h3>
              <p>Automated evaluation based on modern Applicant Tracking System criteria</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Hero Score Gauge */}
        <div className="ats-hero-box">
          <div className="ats-score-circle" style={{ borderColor: getScoreColor(score) }}>
            <span className="ats-num" style={{ color: getScoreColor(score) }}>{score}</span>
            <span className="ats-max">/ 100</span>
          </div>

          <div className="ats-hero-details">
            <h4>
              {score >= 85 ? 'Outstanding Resume Readiness!' :
               score >= 70 ? 'Strong Foundation with High Potential' :
               'Needs More Quantifiable Metrics'}
            </h4>
            <p>
              {score >= 85
                ? 'Your resume possesses clear headings, rich action verbs, strong metrics, and comprehensive contact details that ATS parsers favor.'
                : 'Recruiting algorithms look for specific percentages, metrics, and consistent section structures to rank candidates at the top.'}
            </p>
            <div className="ats-pill-metrics">
              <span className={`ats-stat-pill ${hasMetrics ? 'pass' : 'warn'}`}>
                {hasMetrics ? '✓ Quantifiable metrics detected' : '⚠ Missing numerical metrics'}
              </span>
              <span className={`ats-stat-pill ${hasActionVerbs ? 'pass' : 'warn'}`}>
                {hasActionVerbs ? '✓ Action verbs found' : '⚠ Weak bullet verbs'}
              </span>
              <span className="ats-stat-pill pass">
                ✓ {totalSkillsCount} Skills indexed
              </span>
            </div>
          </div>
        </div>

        {/* Audit Checklist Table */}
        <div className="ats-checklist-section">
          <h4>Section-by-Section Scoring Breakdown</h4>
          <div className="ats-checklist-grid">
            {breakdown.map((item, idx) => (
              <div key={idx} className={`ats-item-card status-${item.status}`}>
                <div className="ats-item-header">
                  <div className="ats-item-title-row">
                    {item.status === 'pass' ? (
                      <CheckCircle2 size={16} className="text-green" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber" />
                    )}
                    <strong>{item.name}</strong>
                  </div>
                  <span className="ats-pts-tag">
                    {item.score} / {item.maxScore} pts
                  </span>
                </div>
                <p className="ats-item-note">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Improvement Suggestions */}
        {suggestions.length > 0 && (
          <div className="ats-suggestions-section">
            <div className="sugg-header">
              <Sparkles size={16} className="text-yellow" />
              <strong>Recommended Action Items:</strong>
            </div>
            <ul className="sugg-list">
              {suggestions.map((sugg, i) => (
                <li key={i}>{sugg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tailor CTA */}
        <div className="ats-modal-footer">
          <button 
            type="button" 
            className="rc-btn-primary"
            onClick={() => {
              onClose();
              onOpenTailorModal();
            }}
          >
            <span>Match With Target Job Description</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
